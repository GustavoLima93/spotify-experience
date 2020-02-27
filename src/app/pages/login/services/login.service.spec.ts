import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy };
let loginService: LoginService;

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LoginService],
    });
    service = TestBed.inject(LoginService);
  });

  it('Testa a instancia de LoginService', () => {
    expect(service).toBeTruthy();
  });
});

describe('Testa Chamadas HTTP', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LoginService],
    })
  );

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    loginService = new LoginService(httpClientSpy as any);
  });

  it('Testa Get De token no spotify ', () => {
    const token = {
      access_token: 'NgCXRK...MzYjw',
      token_type: 'Bearer',
      scope: 'user-read-private user-read-email',
      expires_in: 3600,
      refresh_token: 'NgAagA...Um_SHo',
    };

    httpClientSpy.post.and.returnValue(of(token));

    loginService.getToken('123');

    expect(httpClientSpy.post.calls.count()).toBe(1, 'chamado uma vez');
  });

  it('Testa atualizaToken no spotify ', () => {
    const refreshToken = {
      access_token: 'NgA6ZcYI...ixn8bUQ',
      token_type: 'Bearer',
      scope: 'user-read-private user-read-email',
      expires_in: 3600,
    };

    httpClientSpy.post.and.returnValue(of(refreshToken));

    loginService.atualizaToken();

    expect(httpClientSpy.post.calls.count()).toBe(1, 'chamado uma vez');
  });
});
