import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumComponent } from './album.component';
import { DashboardModule } from '../../dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from 'src/app/shared/services/util.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [UtilService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Testa instancia de AlbumComponent', () => {
    expect(component).toBeTruthy();
  });
});
