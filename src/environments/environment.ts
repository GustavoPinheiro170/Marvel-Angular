// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvType } from "src/assets/enums/envtype.enum";

export const environment = {
  production: false,
  stage: EnvType.local,
  publicKey: 'b9ee71c05f4755923f567079687a48cc',
  privateKey : '95ebdba2a8940d0287e7176e37afd33357bcc705'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
