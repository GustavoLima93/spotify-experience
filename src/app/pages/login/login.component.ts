import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Auth } from './models/auth.model';
import { Params } from './models/params.model';
import { LoginService } from './services/login.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private loginService: LoginService
  ) {}

  async ngOnInit() {
    this.verificaParametroCodeNaRota();
  }

  private verificaParametroCodeNaRota(): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((params: Params):
      | string
      | Subscription => {
      const { code } = params;

      if (code) {
        return this.buscaTokenNaApiDoSpotify(code);
      }

      return this.redirecionaParaBuscarCodeSpotify;
    });
  }

  private get redirecionaParaBuscarCodeSpotify(): string {
    return (this.document.location.href = `
    ${environment.spotify_url_auth}/authorize?client_id=${environment.client_id}&response_type=${environment.response_type}&redirect_uri=${environment.redirect_uri}&scope=${environment.scope}`);
  }

  private buscaTokenNaApiDoSpotify(code: string): Subscription {
    return this.loginService
      .getToken(code)
      .pipe(take(1))
      .subscribe(
        (response: Auth): Promise<Boolean> => {
          const { refresh_token, access_token } = response;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);

          return this.navegaParaRotaDeDashboard();
        }
      );
  }

  private navegaParaRotaDeDashboard(): Promise<Boolean> {
    return this.router.navigate(['/albums']);
  }
}
