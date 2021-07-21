// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://desarrollo.epik.com.co:5002/', // Desarrollo - Demo
  externalBaseUrl: 'https://desarrollo.epik.com.co:5002/', // Desarrollo - Demo
  // baseUrl: 'https://desarrollo.epik.com.co:5001/', // Pre Produccion
  // externalBaseUrl: 'https://desarrollo.epik.com.co:5001/', // Pre Produccion
  firebaseConfig: {
    apiKey: 'AIzaSyDOoCEREIqN7XFvXWFcs3L3Cvzmysm3M04',
    authDomain: 'financiera-epik.firebaseapp.com',
    projectId: 'financiera-epik',
    storageBucket: 'financiera-epik.appspot.com',
    messagingSenderId: '898576659708',
    appId: '1:898576659708:web:d9e8ec6871bb0d5383d379',
    measurementId: 'G-L0R5SNGJF4'
  },
  timeToWaitIframes: 10, // in seconds
  version: 'v1.0.0',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
