import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackComponent } from './track.component';
import { TracksModule } from '../../tracks.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TrackComponent', () => {
  let component: TrackComponent;
  let fixture: ComponentFixture<TrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TracksModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Testa a instancia de TrackComponent', () => {
    expect(component).toBeTruthy();
  });
});
