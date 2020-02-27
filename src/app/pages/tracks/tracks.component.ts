import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { Params } from './models/params-track.model';
import { ItemTrack } from './models/track.model';

import { TrackService } from './services/track.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
})
export class TracksComponent implements OnInit {
  public tracks: ItemTrack[] = [];
  public albumDetalhe: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private trackService: TrackService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.verificaParametrosDaRota();
    this.verificaDetalheDoAlbumNoBehaviorSubjectOuNoCache();
  }

  verificaParametrosDaRota(): Subscription {
    return this.activatedRoute.params.pipe(take(1)).subscribe(
      (param: Params): Subscription => {
        return this.buscaTracksNoSpotify(param);
      }
    );
  }

  verificaDetalheDoAlbumNoBehaviorSubjectOuNoCache(): Subscription {
    return this.utilService.observeDetalhesDOAlbum
      .pipe(
        take(1),
        catchError(() => from([]))
      )
      .subscribe(albumDetalhe =>
        albumDetalhe.id
          ? (this.albumDetalhe = albumDetalhe)
          : (this.albumDetalhe = JSON.parse(
              localStorage.getItem('detalhes_album')
            ))
      );
  }

  buscaTracksNoSpotify({ id }): Subscription {
    return this.trackService
      .buscaTracksNoSpotify(id)
      .pipe(take(1))
      .subscribe((tracks: ItemTrack[]) => (this.tracks = tracks));
  }
}
