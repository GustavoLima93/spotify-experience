import { Component, OnInit, Input } from '@angular/core';

import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  animations: [
    trigger('row', [
      state('ready', style({ opacity: 1 })),
      transition(
        'void => ready',
        animate(
          '300ms 0s ease-in',
          keyframes([
            style({ opacity: 0, transform: 'translateX(-30px)', offset: 0 }),
            style({ opacity: 0.8, transform: 'translateX(10px)', offset: 0.8 }),
            style({ opacity: 1, transform: 'translateX(0px)', offset: 1 }),
          ])
        )
      ),
      transition(
        'ready => void',
        animate(
          '300ms 0s ease-out',
          keyframes([
            style({ opacity: 1, transform: 'translateX( 0px)', offset: 0 }),
            style({
              opacity: 0.8,
              transform: 'translateX(-10px)',
              offset: 0.2,
            }),
            style({ opacity: 0, transform: 'translateX(30px)', offset: 1 }),
          ])
        )
      ),
    ]),
  ],
})
export class TrackComponent implements OnInit {
  public rowState = 'ready';

  @Input()
  public track;

  @Input()
  public numberMusic: number;

  constructor() {}

  ngOnInit(): void {}
}
