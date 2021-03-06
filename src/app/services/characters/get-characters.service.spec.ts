import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { CharacterModel } from 'src/app/models/dto/character.model';
import { OrderBy } from 'src/assets/enums/orderBy.enum';
import { UrlApi } from 'src/assets/enums/url.enum';
import { CoreService } from '../core.service';
import { LoadingControlService } from '../utils/loading-control.service';
import { GetCharactersService } from './get-characters.service';

describe('GetCharactersService', () => {
  let service: GetCharactersService;
  let httpTestingController: HttpTestingController;

  let coreServiceSpy = {
    handleError : () => of(),
    $parameterResponse: new Subject(),
  }

  let loadingSpy: jasmine.SpyObj<LoadingControlService>;

  const fakeMarvelResponseData: CharacterModel[] = [new CharacterModel()];

  beforeEach(async () => {


    loadingSpy = jasmine.createSpyObj('LoadingControlService', ['setLoading']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GetCharactersService,
        { provide: CoreService, useValue: coreServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });
  beforeEach(() => {
    service = TestBed.inject(GetCharactersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expected call getCharacters', () => {
    service
      .getCharacters(OrderBy.Name)
      .subscribe((characters) =>
        expect(characters).toEqual(fakeMarvelResponseData)
      );
      const req = httpTestingController.expectOne(
        `${UrlApi.url}?offset=0&limit=12&orderBy=name`
      );
      expect(req.request.method).toEqual('GET');
      req.flush({
        data: fakeMarvelResponseData,
      });
  });

  afterEach(() => httpTestingController.verify());
});
