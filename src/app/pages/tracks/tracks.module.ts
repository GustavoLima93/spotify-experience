import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';

import { TrackComponent } from './components/track/track.component';
import { TracksRoutingModule } from './tracks-routing.module';
import { TracksComponent } from './tracks.component';

@NgModule({
  declarations: [TracksComponent, TrackComponent, DurationPipe],
  imports: [CommonModule, TracksRoutingModule],
})
export class TracksModule {}
