import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AlbumComponent } from './components/album/album.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [DashboardComponent, AlbumComponent, SearchComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class DashboardModule {}
