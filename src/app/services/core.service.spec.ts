import { HttpErrorResponse } from '@angular/common/http';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ParameterResponse } from '../models/dto/parameters.model';
import {  CoreService } from './core.service';

describe(CoreService.name, () => {
  let service: CoreService;
  let snackbarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        CoreService,
        { provide: MatSnackBar, useValue: snackbarSpy }
      ]
    });

    service = TestBed.inject(CoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('should throw an error', () => {
    const error = {
      error: new ErrorEvent('Fake error')
    } as HttpErrorResponse;
    expect(() => service.handleError(error)).toThrow();
  });

  it('should display an error', () => {
    const error = {
      error: 'Fake error'
    } as HttpErrorResponse;
    service.handleError(error);
    expect(snackbarSpy.open.calls.first().args[0]).toContain('');
  });

  it('should return an error', () => {
    const error = {
      error: 'Fake error'
    } as HttpErrorResponse;
    service.handleError(error).pipe(
      catchError(err => {
        expect(err).toEqual(error);
        return EMPTY;
      })
    ).subscribe();
  });
  it('expected call getParametersResponse', fakeAsync(() => {
    service
      .getParametersResponse()
      .subscribe((characters) =>
        expect(characters).toEqual(new ParameterResponse())
      );
    flush();
  }));
});
