import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

import { DashboardService } from '../../services/dashboard.service';
import { Albums, Item } from '../../models/search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public formularioDeBusca: FormGroup;

  @Output()
  public emiteAlbunsBuscados = new EventEmitter<Item[]>();

  constructor(
    private formBuilder: FormBuilder,
    private dashboarService: DashboardService
  ) {}

  ngOnInit(): void {
    this.iniciaFormularioDeBusca();
    this.inicializaInscricaoEmCampoQueRealizaBuscaNoSpotify();
  }

  iniciaFormularioDeBusca(): FormGroup {
    return (this.formularioDeBusca = this.formBuilder.group({
      campoDeBusca: [localStorage.getItem('ultima_busca') || ''],
    }));
  }

  inicializaInscricaoEmCampoQueRealizaBuscaNoSpotify(): Subscription {
    return this.formularioDeBusca.controls.campoDeBusca.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((texto: string) =>
          this.dashboarService
            .verificaCacheOuBuscaNoSpotify(texto)
            .pipe(catchError(() => from([])))
        )
      )
      .subscribe((albuns: Albums) => this.emiteAlbuns(albuns.items));
  }

  emiteAlbuns(value: Item[]): void {
    return this.emiteAlbunsBuscados.emit(value);
  }
}
