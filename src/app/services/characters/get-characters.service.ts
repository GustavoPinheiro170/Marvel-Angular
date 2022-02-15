import { Injectable } from '@angular/core';
import { Observable, take, shareReplay, catchError, map, finalize } from 'rxjs';

import { OrderBy } from 'src/assets/enums/orderBy.enum';
import { ParameterResponse } from '../../models/dto/parameters.model';
import { CharacterModel } from 'src/app/models/dto/character.model';
import { MapperResult } from 'src/assets/helpers/mapper-result.helper';
import { CoreService } from '../core.service';
import { LoadingControlService } from '../utils/loading-control.service';
import { UrlApi } from 'src/assets/enums/url.enum';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetCharactersService {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _coreService: CoreService,
    private readonly _loadingControl: LoadingControlService
  ) {}

  getCharacters(
    orderBY?: OrderBy | string,
    offset?: string,
    limit?: string
  ): Observable<CharacterModel[]> {
    const parameters = new HttpParams()
      .set('offset', offset ?? 0)
      .set('limit', limit ?? 12)
      .set('orderBy', orderBY ?? OrderBy.Name);

    this._loadingControl.setLoading(true);
    return this._httpClient
      .get<ParameterResponse>(`${UrlApi.url}`, { params: parameters })
      .pipe(
        take(1),
        shareReplay(1),

        map((response: ParameterResponse) => {
          this._coreService.$parameterResponse.next(response);
          return MapperResult.mapperResponse(response.data.results);
        }),
        catchError(this._coreService.handleError),
        finalize(() => this._loadingControl.setLoading(false))
      );
  }
}
