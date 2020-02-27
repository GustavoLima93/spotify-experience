import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginService } from '../../login/services/login.service';
import { Albums, Search } from '../models/search.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  verificaCacheOuBuscaNoSpotify(
    search: string,
    offset = 0,
    limit = 20
  ): Observable<Search | any> {
    if (search) {
      localStorage.setItem('ultima_busca', search);

      const cache = localStorage.getItem(search);

      if (cache) {
        return from([JSON.parse(cache)]);
      }

      return this.buscaAlbumSpotify(search, offset, limit);
    }

    return from([{ items: [] }]);
  }

  buscaAlbumSpotify(search, offset, limit): Observable<Search | Albums> {
    const params = new HttpParams()
      .set('q', search)
      .set('type', 'album')
      .set('offset', String(offset))
      .set('limit', String(limit));

    return this.http
      .get<Search | Albums>(`${environment.spotify_url}/search`, { params })
      .pipe(
        tap(() => this.loginService.atualizaToken()),
        map((response: Search) => response.albums),
        tap((response: Albums) =>
          localStorage.setItem(search, JSON.stringify(response))
        )
      );
  }
}
