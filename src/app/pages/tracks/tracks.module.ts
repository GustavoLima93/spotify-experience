import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { TracksComponent } from './components/tracks/tracks.component';
import { TrackComponent } from './components/track/track.component';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';

@NgModule({
  declarations: [TracksComponent, TrackComponent, DurationPipe],
  imports: [CommonModule, TracksRoutingModule],
})
export class TracksModule {}
