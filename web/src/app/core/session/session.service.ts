import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public accessToken: string;
  public refreshToken: string;

  constructor(private cookieService: CookieService) {
    this.accessToken = cookieService.get('accessToken') || '';
    this.refreshToken = cookieService.get('refreshToken') || '';
  }

  public destroy(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.cookieService.delete('accessToken');
    this.cookieService.delete('refreshToken');
  }
}
