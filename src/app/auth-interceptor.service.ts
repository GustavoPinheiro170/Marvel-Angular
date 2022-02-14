import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MD5 } from 'crypto-js';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  private _ts = Math.floor(Date.now() / 1000);
  private _convertMD5 = MD5(
    this._ts + environment.privateKey + environment.publicKey
  ).toString();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ params: req.params.set('apikey', environment.publicKey).set('ts', this._ts).set('hash', this._convertMD5) });
    return next.handle(authReq);
  }

}
