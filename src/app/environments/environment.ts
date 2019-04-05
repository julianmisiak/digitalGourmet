// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:8081',
  firebase: {
    apiKey: 'AIzaSyAMJo2yi-tehwI_MVWVn-Xl3PQyBKrHK0c',
    authDomain: 'dgdev-96257.firebaseapp.com',
    databaseURL: 'https://dgdev-96257.firebaseio.com',
    projectId: 'dgdev-96257',
    storageBucket: 'dgdev-96257.appspot.com',
    messagingSenderId: '865954905356'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
