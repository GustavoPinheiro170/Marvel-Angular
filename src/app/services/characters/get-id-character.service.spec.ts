import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CharacterModel } from 'src/app/models/dto/character.model';
import { UrlApi } from 'src/assets/enums/url.enum';
import { CoreService } from '../core.service';
import { LoadingControlService } from '../utils/loading-control.service';
import { GetIdCharacterService } from './get-id-character.service';

describe('GetIdCharacterService', () => {
  let service: GetIdCharacterService;
  let httpTestingController: HttpTestingController;

  let coreServiceSpy: jasmine.SpyObj<CoreService>;
  let loadingSpy: jasmine.SpyObj<LoadingControlService>;

  const fakeMarvelResponseData: CharacterModel[] = [new CharacterModel()];

  beforeEach(async () => {
    coreServiceSpy = jasmine.createSpyObj('CoreService', [
      'handleError',
      '$parameterResponse',
    ]);

    loadingSpy = jasmine.createSpyObj('LoadingControlService', ['setLoading']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GetIdCharacterService,
        { provide: CoreService, useValue: coreServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });
  beforeEach(() => {
    service = TestBed.inject(GetIdCharacterService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expected call getIdCharacter', () => {
    service.getIdCharacter(1077563).subscribe((characters) => {
      expect(characters).toEqual(fakeMarvelResponseData);
    });
    const req = httpTestingController.expectOne(
      `${UrlApi.url}/1077563/comics?`
    );
    expect(req.request.method).toEqual('GET');
    req.flush({
      data: fakeMarvelResponseData,
    });
  });
  afterEach(() => httpTestingController.verify());
});
