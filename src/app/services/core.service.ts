import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackbar: MatSnackBar) { }

  handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      throw error;
    } else {
      this._snackbar.open( `${error.message}`, 'Something bad happened; please try again later.');
    }
    return throwError(error);
  };
}
