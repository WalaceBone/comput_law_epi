import { Injectable } from '@angular/core';
import { SessionService } from '../session/session.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private session: SessionService,
    private cookieService: CookieService
  ) {}

  public isSignedIn() {
    return !!this.session.accessToken;
  }

  public signOut() {
    this.session.destroy();
  }

  public signIn(accessToken: string, refreshToken: string) {
    if (!accessToken || !refreshToken) {
      return;
    }

    this.session.refreshToken = refreshToken;
    this.session.accessToken = accessToken;

    this.cookieService.set('accessToken', accessToken, 365, '/');
    this.cookieService.set('refreshToken', refreshToken, 365, '/');
  }

  public getAccessToken(): string {
    return this.session.accessToken;
  }

  public setAccessToken(accessToken: string, refreshToken: string): void {
    this.session.refreshToken = refreshToken;
    this.session.accessToken = accessToken;

    this.cookieService.set('accessToken', accessToken, 365, '/');
    this.cookieService.set('refreshToken', refreshToken, 365, '/');
  }
}
