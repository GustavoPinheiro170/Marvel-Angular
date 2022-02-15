
import { ParameterResponse } from '../../models/dto/parameters.model';

import { CharacterModel } from 'src/app/models/dto/character.model';
import { MapperResult } from 'src/assets/helpers/mapper-result.helper';
import { CoreService } from '../core.service';
import { CreateUrlComic } from 'src/assets/helpers/create-comics-urls';
import { LoadingControlService } from '../utils/loading-control.service';
import { Observable, take, shareReplay, catchError, map, finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetIdCharacterService {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _coreService: CoreService,
    private readonly _loadingControl: LoadingControlService
  ) {}

  getIdCharacter(characterId: number): Observable<CharacterModel[]> {
    this._loadingControl.setLoading(true);
    return this._httpClient
      .get<ParameterResponse>(CreateUrlComic.characterComidId(characterId))
      .pipe(
        take(1),
        shareReplay(1),
        catchError(this._coreService.handleError),
        map((response: ParameterResponse) =>
          MapperResult.mapperResponse(response.data.results)
        ),
        finalize(() => this._loadingControl.setLoading(false))
      );
  }
}
