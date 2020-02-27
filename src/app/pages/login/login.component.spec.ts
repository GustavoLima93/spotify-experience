import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginModule } from './login.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from './services/login.service';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LoginModule, HttpClientModule, RouterTestingModule],
      providers: [LoginService, BrowserDynamicTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Testa instancia de LoginComponent', () => {
    expect(component).toBeTruthy();
  });
});
