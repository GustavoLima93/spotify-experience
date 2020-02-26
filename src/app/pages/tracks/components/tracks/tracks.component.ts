import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TrackService } from '../../services/track.service';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
})
export class TracksComponent implements OnInit {
  public tracks = [];
  public albumDetalhe: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private trackService: TrackService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (param: Params): Subscription => {
        return this.buscaTracksNoSpotify(param);
      }
    );

    this.utilService.observeDetalhesDOAlbum
      .pipe(take(1))
      .subscribe(albumDetalhe =>
        albumDetalhe.id
          ? (this.albumDetalhe = albumDetalhe)
          : (this.albumDetalhe = JSON.parse(
              localStorage.getItem('detalhes_album')
            ))
      );
  }

  buscaTracksNoSpotify({ id }) {
    return this.trackService
      .buscaTracksNoSpotify(id)
      .subscribe(tracks => (this.tracks = tracks));
  }
}

export interface Params {
  id: string;
}
