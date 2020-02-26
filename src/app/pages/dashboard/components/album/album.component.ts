import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/shared/services/util.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  animations: [
    trigger('myAnimationTrigger', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({ opacity: 0, transform: 'translate(-30px , -10px)' }),
        animate('500ms 0s ease-in-out'),
      ]),
    ]),
  ],
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  public albumState = 'ready';

  @Input()
  public album;

  constructor(private router: Router, private utilService: UtilService) {}

  ngOnInit(): void {}

  navegaParaMusicasDoAlbum(): Promise<Boolean> {
    this.utilService.inseriDetalhesDoAlbum({
      id: this.album.id,
      nomeArtista: this.album.artists[0].name,
      nomeAlbum: this.album.name,
      img: this.album.images[1].url,
    });
    return this.router.navigate([`/albums/${this.album.id}`]);
  }
}
