import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, take, shareReplay, catchError, map, finalize } from 'rxjs';

import { ParameterResponse } from '../../models/dto/parameters.model';
import { CharacterModel } from 'src/app/models/dto/character.model';
import { MapperResult } from 'src/assets/helpers/mapper-result.helper';
import { CoreService } from '../core.service';
import { LoadingControlService } from '../utils/loading-control.service';
import { UrlApi } from 'src/assets/enums/url.enum';

@Injectable({
  providedIn: 'root',
})
export class GetFilterCharacterService {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _coreService: CoreService,
    private readonly _loadingControl: LoadingControlService
  ) {}


  filterCharacter(name: string): Observable<CharacterModel[]> {

    const parameters = new HttpParams()
    .set('nameStartsWith', name ?? 0)

    this._loadingControl.setLoading(true);
    return this._httpClient
      .get<ParameterResponse>(`${UrlApi.url}` , { params: parameters})
      .pipe(
        take(1),
        shareReplay(1),
        catchError(this._coreService.handleError),
        map((response: ParameterResponse) => {
          this._coreService.$parameterResponse.next(response);
          return MapperResult.mapperResponse(response.data.results);
        }),
        finalize(() => this._loadingControl.setLoading(false)),
      );
  }
}
