import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private detalhesDoAlbum = new BehaviorSubject<any>({});
  public observeDetalhesDOAlbum = this.detalhesDoAlbum.asObservable();

  constructor() {}

  inseriDetalhesDoAlbum(album: any) {
    localStorage.setItem('detalhes_album', JSON.stringify(album));
    return this.detalhesDoAlbum.next(album);
  }
}
