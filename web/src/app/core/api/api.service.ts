import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SignInResponse } from '../../models/server-response';
import { User } from '../../models/user.model';
import { SessionService } from '../session/session.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private session: SessionService) {}

  private static handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return throwError(error);
  }

  /* AUTHENTICATION API CALL */

  public register(username: string, password: string) {
    return this.http
      .post(`${API_URL}/auth/register`, { username, password })
      .pipe(map((res) => res))
      .pipe(catchError(ApiService.handleError));
  }

  public login(username: string, password: string): Observable<SignInResponse> {
    return this.http
      .post(`${API_URL}/auth/login`, { username, password })
      .pipe(map((res) => res as SignInResponse))
      .pipe(catchError(ApiService.handleError));
  }

  public refreshToken(): Observable<SignInResponse> {
    return this.http
      .get(`${API_URL}/auth/refreshToken?token=${this.session.refreshToken}`)
      .pipe(map((res) => res as SignInResponse))
      .pipe(catchError(ApiService.handleError));
  }
}