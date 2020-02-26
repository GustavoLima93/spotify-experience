import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public formularioDeBusca: FormGroup;

  @Output()
  public emiteAlbunsBuscados = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private dashboarService: DashboardService
  ) {}

  ngOnInit(): void {
    this.formularioDeBusca = this.formBuilder.group({
      campoDeBusca: [localStorage.getItem('ultima_busca') || ''],
    });

    this.formularioDeBusca.controls.campoDeBusca.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(texto =>
          this.dashboarService
            .verificaCacheOuBuscaNoSpotify(texto)
            .pipe(catchError(() => from([])))
        )
      )
      .subscribe((albuns: any) => this.emitTexoDeBusca(albuns.items));
  }

  emitTexoDeBusca(value: any): void {
    this.emiteAlbunsBuscados.emit(value);
  }
}
