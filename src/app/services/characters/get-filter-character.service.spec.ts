
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { CharacterModel } from 'src/app/models/dto/character.model';
import { UrlApi } from 'src/assets/enums/url.enum';
import { CoreService } from '../core.service';
import { LoadingControlService } from '../utils/loading-control.service';
import { GetFilterCharacterService } from './get-filter-character.service';

describe('GetFilterCharacterService', () => {
  let service: GetFilterCharacterService;
  let httpTestingController: HttpTestingController;

  let loadingSpy: jasmine.SpyObj<LoadingControlService>;

  let coreServiceSpy = {
    handleError : () => of(),
    $parameterResponse: new Subject(),
  }

  const fakeMarvelResponseData: CharacterModel[] = [new CharacterModel()];

  beforeEach(async () => {

    loadingSpy = jasmine.createSpyObj('LoadingControlService', [
      'setLoading',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GetFilterCharacterService,
        { provide: CoreService, useValue: coreServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });
  beforeEach(() => {
    service = TestBed.inject(GetFilterCharacterService);
    httpTestingController = TestBed.inject(HttpTestingController);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expected call filterCharacter', () => {
    service
      .filterCharacter('fakename')
      .subscribe((characters: CharacterModel[]) =>
        expect(characters).toEqual(fakeMarvelResponseData)
      );
      const req = httpTestingController.expectOne(
        `${UrlApi.url}?nameStartsWith=fakename`
      );
      expect(req.request.method).toEqual('GET');
      req.flush({
        data: fakeMarvelResponseData,
      });
  });
  afterEach(() => httpTestingController.verify());
});
