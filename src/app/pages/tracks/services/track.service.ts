import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { LoginService } from '../../login/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  buscaTracksNoSpotify(id: string): Observable<any> {
    return this.http
      .get<any>(`${environment.spotify_url}/albums/${id}/tracks`)
      .pipe(
        tap(() => this.loginService.atualizaToken()),
        map(result => result.items)
      );
  }
}
