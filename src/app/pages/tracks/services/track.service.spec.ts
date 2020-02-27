import { TestBed } from '@angular/core/testing';

import { TrackService } from './track.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../login/services/login.service';
import { of } from 'rxjs';

let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy };
let trackService: TrackService;

describe('TrackService', () => {
  let service: TrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LoginService, TrackService],
    });
    service = TestBed.inject(TrackService);
  });

  it('Testa a instancia de TrackService', () => {
    expect(service).toBeTruthy();
  });
});

describe('Testa Chamadas HTTP', () => {
  let loginService: LoginService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LoginService],
    })
  );

  beforeEach(() => {
    loginService = TestBed.inject(LoginService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);

    trackService = new TrackService(httpClientSpy as any, loginService);
  });

  it('Testa Get De token no spotify ', () => {
    const tracks = {
      href:
        'https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/tracks?offset=0&limit=2',
      items: [
        {
          artists: [
            {
              external_urls: {
                spotify:
                  'https://open.spotify.com/artist/08td7MxkoHQkXnWAYD8d6Q',
              },
              href: 'https://api.spotify.com/v1/artists/08td7MxkoHQkXnWAYD8d6Q',
              id: '08td7MxkoHQkXnWAYD8d6Q',
              name: 'Tania Bowra',
              type: 'artist',
              uri: 'spotify:artist:08td7MxkoHQkXnWAYD8d6Q',
            },
          ],
          available_markets: [
            'AD',
            'AR',
            'AT',
            'AU',
            'BE',
            'BG',
            'BO',
            'BR',
            'CA',
            'CH',
            'CL',
            'CO',
            'CR',
            'CY',
            'CZ',
            'DE',
            'DK',
            'DO',
            'EC',
            'EE',
            'ES',
            'FI',
            'FR',
            'GB',
            'GR',
            'GT',
            'HK',
            'HN',
            'HU',
            'IE',
            'IS',
            'IT',
            'LI',
            'LT',
            'LU',
            'LV',
            'MC',
            'MT',
            'MX',
            'MY',
            'NI',
            'NL',
            'NO',
            'NZ',
            'PA',
            'PE',
            'PH',
            'PL',
            'PT',
            'PY',
            'RO',
            'SE',
            'SG',
            'SI',
            'SK',
            'SV',
            'TR',
            'TW',
            'US',
            'UY',
          ],
          disc_number: 1,
          duration_ms: 276773,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/2TpxZ7JUBn3uw46aR7qd6V',
          },
          href: 'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V',
          id: '2TpxZ7JUBn3uw46aR7qd6V',
          name: 'All I Want',
          preview_url:
            'https://p.scdn.co/mp3-preview/6d00206e32194d15df329d4770e4fa1f2ced3f57',
          track_number: 1,
          type: 'track',
          uri: 'spotify:track:2TpxZ7JUBn3uw46aR7qd6V',
        },
        {
          artists: [
            {
              external_urls: {
                spotify:
                  'https://open.spotify.com/artist/08td7MxkoHQkXnWAYD8d6Q',
              },
              href: 'https://api.spotify.com/v1/artists/08td7MxkoHQkXnWAYD8d6Q',
              id: '08td7MxkoHQkXnWAYD8d6Q',
              name: 'Tania Bowra',
              type: 'artist',
              uri: 'spotify:artist:08td7MxkoHQkXnWAYD8d6Q',
            },
          ],
          available_markets: [
            'AD',
            'AR',
            'AT',
            'AU',
            'BE',
            'BG',
            'BO',
            'BR',
            'CA',
            'CH',
            'CL',
            'CO',
            'CR',
            'CY',
            'CZ',
            'DE',
            'DK',
            'DO',
            'EC',
            'EE',
            'ES',
            'FI',
            'FR',
            'GB',
            'GR',
            'GT',
            'HK',
            'HN',
            'HU',
            'IE',
            'IS',
            'IT',
            'LI',
            'LT',
            'LU',
            'LV',
            'MC',
            'MT',
            'MX',
            'MY',
            'NI',
            'NL',
            'NO',
            'NZ',
            'PA',
            'PE',
            'PH',
            'PL',
            'PT',
            'PY',
            'RO',
            'SE',
            'SG',
            'SI',
            'SK',
            'SV',
            'TR',
            'TW',
            'US',
            'UY',
          ],
          disc_number: 1,
          duration_ms: 247680,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/4PjcfyZZVE10TFd9EKA72r',
          },
          href: 'https://api.spotify.com/v1/tracks/4PjcfyZZVE10TFd9EKA72r',
          id: '4PjcfyZZVE10TFd9EKA72r',
          name: 'Someday',
          preview_url:
            'https://p.scdn.co/mp3-preview/2b15de922bf4f4b8cfe09c8448079b8ff7a45a5f',
          track_number: 2,
          type: 'track',
          uri: 'spotify:track:4PjcfyZZVE10TFd9EKA72r',
        },
      ],
      limit: 2,
      next:
        'https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/tracks?offset=2&limit=2',
      offset: 0,
      previous: null,
      total: 11,
    };

    httpClientSpy.get.and.returnValue(of(tracks));

    trackService.buscaTracksNoSpotify('123');

    expect(httpClientSpy.get.calls.count()).toBe(1, 'chamado uma vez');
  });
});
