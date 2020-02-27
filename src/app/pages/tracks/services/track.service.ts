import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginService } from '../../login/services/login.service';
import { ItemTrack, Track } from '../models/track.model';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  buscaTracksNoSpotify(id: string): Observable<Track | ItemTrack[]> {
    return this.http
      .get<Track | ItemTrack[]>(
        `${environment.spotify_url}/albums/${id}/tracks`
      )
      .pipe(
        tap(() => this.loginService.atualizaToken()),
        map((result: Track) => result.items)
      );
  }
}
