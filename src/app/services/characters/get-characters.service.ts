import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParamaterRequest } from '../../models/request/parameter-request.model.';
import { UrlApi } from 'src/assets/enums/url.enum';
import { OrderBy } from 'src/assets/enums/orderBy.enum';
import { QueryStringService } from '../utils/query-string.service';
import { ParameterResponse } from '../../models/dto/parameters.model';
import {
  BehaviorSubject,
  catchError,
  finalize,
  first,
  map,
  Observable,
  Subject,
} from 'rxjs';
import { CharacterModel } from 'src/app/models/dto/character.model';
import { MapperResult } from 'src/assets/helpers/mapper-result.helper';
import { CoreService } from '../core.service';
import { CreateUrlComic } from '../utils/create-comics-urls';

@Injectable({
  providedIn: 'root',
})
export class GetCharactersService {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _queryString: QueryStringService,
    private readonly _coreService: CoreService
  ) {}

  public $loading: BehaviorSubject<any> = new BehaviorSubject(true);
  private $parameterResponse: Subject<ParameterResponse> = new Subject();


  private createUrlParameters(parameters: ParamaterRequest): string
  {
    return `${UrlApi.url}${this._queryString.buildQueryString(parameters)}`;
  }

  getCharacters(
    orderBY?: OrderBy | string,
    offset?: string,
    limit?: string
  ): Observable<CharacterModel[]> {
    const parameters = new ParamaterRequest({
      offset: offset,
      limit: limit,
      orderBy: orderBY ?? OrderBy.Name,
    });
    return this._httpClient
      .get<ParameterResponse>(this.createUrlParameters(parameters))
      .pipe(first())
      .pipe(
        map((response: ParameterResponse) => {
          this.$parameterResponse.next(response);
          return MapperResult.mapperResponse(response.data?.results);
        }),
        finalize(() => this.$loading.next(false)),
        catchError(this._coreService.handleError)
      );
  }

  filterCharacter(name?: string): Observable<CharacterModel[]> {
    const parameters = new ParamaterRequest({
      nameStartsWith: name?.toLocaleLowerCase(),
    });
    return this._httpClient
      .get<ParameterResponse>(this.createUrlParameters(parameters))
      .pipe(first())
      .pipe(
        map((response: ParameterResponse) => {
          this.$parameterResponse.next(response);
          return MapperResult.mapperResponse(response.data?.results);
        }),
        finalize(() => this.$loading.next(false)),
        catchError(this._coreService.handleError)
      );
  }

  getIdCharacter(characterId: number): Observable<CharacterModel[] > {
    return this._httpClient
      .get<ParameterResponse>(CreateUrlComic.characterComidId(characterId))
      .pipe(first())
      .pipe(
        map((response: ParameterResponse) => {
          return MapperResult.mapperResponse(response.data?.results);
        }),
        catchError(this._coreService.handleError),
        finalize(() => this.$loading.next(false))
      );
  }

  getParametersResponse(): Observable<ParameterResponse> {
    return this.$parameterResponse?.asObservable();
  }
}
