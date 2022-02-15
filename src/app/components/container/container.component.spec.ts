import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { CharacterModel } from 'src/app/models/dto/character.model';
import { DataModel } from 'src/app/models/dto/data.model';
import { Paginator } from 'src/app/models/dto/paginator.model';
import { ParameterResponse } from 'src/app/models/dto/parameters.model';
import { GetCharactersService } from 'src/app/services/characters/get-characters.service';
import { GetFilterCharacterService } from 'src/app/services/characters/get-filter-character.service';
import { CoreService } from 'src/app/services/core.service';
import { LoadingControlService } from 'src/app/services/utils/loading-control.service';
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
    etag: '1',
    status: '',
  };

  let mockCharacterResult: Array<CharacterModel> = [
    { ...new CharacterModel() },
  ];
  let getCharactersService = {
    getCharacters: () => of(mockCharacterResult),
  };

  let getFilterServiceStub = {
    filterCharacter: () => of(mockCharacterResult),
  };

  let coreServiceStub = {
    getParametersResponse: () => of<ParameterResponse>(),
  };
  let loadingControlStub = {
    observableLoading: () => of(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MatProgressBarModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        { provide: GetCharactersService, useValue: getCharactersService },
        { provide: GetFilterCharacterService, useValue: getFilterServiceStub },
        { provide: CoreService, useValue: coreServiceStub },
        { provide: LoadingControlService, useValue: loadingControlStub },
      ],
      declarations: [
        ContainerComponent,
        LoadingComponent,
        CardsComponent,
        PaginatorComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expected call getParametersResponse', fakeAsync(() => {
    spyOn(coreServiceStub, 'getParametersResponse').and.returnValue(
      of(mockParameterResponse)
    );
    component.getParametersResponse();
    expect(component.totalPages).toEqual(0);
    flush();
  }));

  it('expected call getOrder', fakeAsync(() => {
    spyOn(getCharactersService, 'getCharacters').and.returnValue(
      of(mockCharacterResult)
    );
    component.getOrder('-name');
    expect(component.characters).toBeDefined();
    flush();
  }));

  it('expected call getInitialCharacters', fakeAsync(() => {
    spyOn(getCharactersService, 'getCharacters').and.returnValue(
      of(mockCharacterResult)
    );
    component.getInitialCharacters();
    expect(component.progressValue).toEqual(0);
    flush();
  }));

  it('expected call filterCharacter not name', fakeAsync(() => {
    spyOn(getFilterServiceStub, 'filterCharacter').and.returnValue(
      of(mockCharacterResult)
    );
    component.filterCharacter('');
    expect(component.characters).toBeDefined();
    flush();
  }));
  it('expected call filterCharacter exist name', fakeAsync(() => {
    spyOn(getFilterServiceStub, 'filterCharacter').and.returnValue(
      of(mockCharacterResult)
    );
    component.filterCharacter('hulk');
    expect(component.characters).toBeDefined();

    flush();
  }));

  it('expected call handlerPages', fakeAsync(() => {
    spyOn(getCharactersService, 'getCharacters').and.returnValue(
      of(mockCharacterResult)
    );
    let paginator: Paginator = {
      length: 0,
      pageIndex: 1,
      pageSize: 12,
    };
    component.handlerPages(paginator);
    expect(component.progressValue).toEqual(100);
    flush();
  }));
});
