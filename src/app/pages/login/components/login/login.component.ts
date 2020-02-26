import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Auth } from '../../models/auth.model';

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
    this.activatedRoute.queryParams.subscribe((params: Params):
      | string
      | void => {
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

  private buscaTokenNaApiDoSpotify(code: string): void {
    this.loginService.getToken(code).subscribe(
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

export interface Params {
  code: string;
}
