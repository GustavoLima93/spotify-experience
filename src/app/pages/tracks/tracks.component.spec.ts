import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksComponent } from './tracks.component';
import { TracksModule } from './tracks.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from 'src/app/shared/services/util.service';
import { TrackService } from './services/track.service';

describe('TracksComponent', () => {
  let component: TracksComponent;
  let fixture: ComponentFixture<TracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TracksModule, HttpClientModule, RouterTestingModule],
      providers: [UtilService, TrackService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Testa a instancia de TracksComponent', () => {
    expect(component).toBeTruthy();
  });
});
