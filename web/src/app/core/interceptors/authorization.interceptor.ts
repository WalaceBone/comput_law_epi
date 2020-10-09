import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api/api.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  private refreshing$ = new BehaviorSubject<boolean>(false);

  constructor(public authService: AuthService, public api: ApiService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.authService.getAccessToken()) {
      return next.handle(request);
    }
    return next.handle(request.clone(this.setHeaders())).pipe(
      catchError((err) => {
        switch (err.status) {
          case 401:
            return this.handle401Error(request, next);
          default:
            return throwError(err);
        }
      })
    );
  }

  private handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.refreshing$.getValue()) {
      this.refreshing$.next(true);
      this.api.refreshToken().subscribe((res) => {
        this.authService.setAccessToken(res.accessToken, res.refreshToken);
        return this.refreshing$.next(false);
      });
    }
    return this.refreshing$.pipe(
      filter((refreshing) => refreshing === false),
      take(1),
      switchMap(() =>
        this.authService.getAccessToken()
          ? next.handle(request.clone(this.setHeaders()))
          : throwError(new Error('Not Authorized'))
      )
    );
  }

  private setHeaders() {
    return {
      setHeaders: {
        Authorization: `Bearer ${this.authService.getAccessToken()}`,
      },
    };
  }
}

