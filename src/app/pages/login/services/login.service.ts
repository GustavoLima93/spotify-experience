import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Auth } from '../models/auth.model';
import { TokenRefresh } from '../models/tokenrefresh.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  getToken(param: String): Observable<Auth> {
    const body = `grant_type=${environment.grant_type}&code=${param}&redirect_uri=${environment.redirect_uri}`;
    return this.http.post<Auth>(
      `${environment.spotify_url_auth}/api/token`,
      body,
      {
        headers: this.preparaAuthorizationHeader,
      }
    );
  }

  atualizaToken(): Subscription {
    const body = `grant_type=refresh_token&refresh_token=${localStorage.getItem(
      'refresh_token'
    )}`;
    return this.http
      .post<TokenRefresh>(`${environment.spotify_url_auth}/api/token`, body, {
        headers: this.preparaAuthorizationHeader,
      })
      .pipe(
        take(1),
        map((response: TokenRefresh) => response.access_token)
      )
      .subscribe((data: string) => localStorage.setItem('access_token', data));
  }

  get token(): string {
    return localStorage.getItem('access_token');
  }

  get refreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

  private get preparaAuthorizationHeader(): HttpHeaders {
    const basic = `Basic ${btoa(
      `${environment.client_id}:${environment.client_secret}`
    )}`;
    return new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', basic);
  }
}
