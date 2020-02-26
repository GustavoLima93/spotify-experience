// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  client_id: '791ed819e75e48138333cbb2c8c6e15d',
  client_secret: 'aacb62a67d1e466a83ec37a3e04bb1fb',
  spotify_url_auth: 'https://accounts.spotify.com',
  response_type: 'code',
  redirect_uri: 'http%3A%2F%2Flocalhost%3A4200%2Flogin',
  scope: 'user-read-private%20user-read-email',
  state: '34fFs29kd09',
  show_dialog: 'true',
  grant_type: 'authorization_code',
  spotify_url: 'https://api.spotify.com/v1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
