import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from 'src/app/app.module';
import { LoginService } from 'src/app/pages/login/services/login.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [LoginService],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('Testa instancia de AuthGuard', () => {
    expect(guard).toBeTruthy();
  });
});
