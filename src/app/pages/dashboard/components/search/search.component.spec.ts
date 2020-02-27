import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { DashboardModule } from '../../dashboard.module';
import { HttpClientModule } from '@angular/common/http';

import { FormBuilder } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DashboardModule, HttpClientModule],
      providers: [FormBuilder, DashboardService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Testa a instancia de SearchComponent', () => {
    expect(component).toBeTruthy();
  });
});
