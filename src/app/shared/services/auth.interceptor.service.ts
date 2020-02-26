import { Injectable, Injector } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoginService } from 'src/app/pages/login/services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private urlRefreshToken = 'https://accounts.spotify.com/api/token';

  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService);
    if (loginService.token && request.url !== this.urlRefreshToken) {
      const authRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${loginService.token}` },
      });
      return next.handle(authRequest);
    } else {
      return next.handle(request);
    }
  }
}
