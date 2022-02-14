import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DataModel } from 'src/app/models/dto/data.model';
import { Paginator } from 'src/app/models/dto/paginator.model';
import { ParameterResponse } from 'src/app/models/dto/parameters.model';
import { GetCharactersService } from 'src/app/services/characters/get-characters.service';
import { LoadingComponent } from 'src/assets/helpers/components/loading/loading.component';
import { CardsComponent } from '../cards/cards.component';
import { PaginatorComponent } from '../paginator/paginator.component';

import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;


  let mockParameterResponse: ParameterResponse = {
    data: new DataModel(),
    attributionHTML: '',
    attributionText: '',
    code: 0,
    copyright: '',
    etag: "1",
    status : '',
  }
  let getCharactersService = {
    getParametersResponse: () => new Observable<ParameterResponse>(),
    getCharacters: () => new Observable<ParameterResponse>(),
    $loading: new Observable<ParameterResponse>(),

  }

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      providers: [
        MatProgressBarModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        { provide: GetCharactersService, useValue: getCharactersService }
      ],
      declarations: [
        ContainerComponent,
        LoadingComponent,
        CardsComponent,
        PaginatorComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // spyOn(getCharactersService, 'getParametersResponse').and.returnValue({ subscribe: () => {} })
    expect(component).toBeTruthy();
  });
});
