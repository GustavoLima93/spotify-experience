import { Component, OnInit, DoCheck } from '@angular/core';

import { Item } from './models/search.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, DoCheck {
  public albuns: Item[] = [];

  public ultimaBusca: string;

  constructor() {}

  ngOnInit() {
    const ultimaBusca = localStorage.getItem('ultima_busca');
    const albuns = localStorage.getItem(ultimaBusca);

    this.albuns = (albuns && JSON.parse(albuns).items) || [];
    this.ultimaBusca = ultimaBusca || '';
  }

  ngDoCheck() {
    const ultimaBusca = localStorage.getItem('ultima_busca');
    this.ultimaBusca = ultimaBusca || '';
  }

  recebeAlbunsBuscados(albuns: Item[]): void {
    this.albuns = albuns;
  }
}
