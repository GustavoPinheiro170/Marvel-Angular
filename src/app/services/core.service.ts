import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ParameterResponse } from '../models/dto/parameters.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackbar: MatSnackBar) { }

  public $parameterResponse: BehaviorSubject<ParameterResponse> = new BehaviorSubject(new ParameterResponse());

  handleError(error: HttpErrorResponse) : Observable<never> {
    if (error.error instanceof ErrorEvent) {
      throw error;
    } else {
      this._snackbar.open( `${error.message}`, 'Something bad happened; please try again later.');
    }
    return throwError(error);
  };

  getParametersResponse(): Observable<ParameterResponse> {
    return this.$parameterResponse.asObservable();
  }
}
