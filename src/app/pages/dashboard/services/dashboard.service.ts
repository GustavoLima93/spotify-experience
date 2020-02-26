import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LoginService } from '../../login/services/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  verificaCacheOuBuscaNoSpotify(
    search,
    offset = 0,
    limit = 20
  ): Observable<any | any> {
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

  buscaAlbumSpotify(search, offset, limit): Observable<any> {
    const params = new HttpParams()
      .set('q', search)
      .set('type', 'album')
      .set('offset', String(offset))
      .set('limit', String(limit));

    return this.http
      .get<any>(`${environment.spotify_url}/search`, { params })
      .pipe(
        tap(() => this.loginService.atualizaToken()),
        map((response: any) => response.albums),
        tap(response => localStorage.setItem(search, JSON.stringify(response)))
      );
  }
}
