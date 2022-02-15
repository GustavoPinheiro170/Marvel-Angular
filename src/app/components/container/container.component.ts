import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, first, finalize } from 'rxjs/operators';
import { Paginator } from 'src/app/models/dto/paginator.model';
import { ParameterResponse } from 'src/app/models/dto/parameters.model';
import { CharacterModel } from 'src/app/models/dto/character.model';
import { GetCharactersService } from 'src/app/services/characters/get-characters.service';
import { OrderBy } from 'src/assets/enums/orderBy.enum';
import { CountPages } from 'src/assets/helpers/count-pages.helper';
import { CoreService } from 'src/app/services/core.service';
import { GetFilterCharacterService } from 'src/app/services/characters/get-filter-character.service';
import { LoadingControlService } from 'src/app/services/utils/loading-control.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  constructor(
    private readonly _getFilterCharacter: GetFilterCharacterService,
    private readonly _getCharacters: GetCharactersService,
    private readonly _coreService: CoreService,
    private readonly _loadingControl: LoadingControlService,
  ) {
  }

  private _orderBy: string = OrderBy.Name;
  private _countPage: string = '0';

  loading: boolean = false;
  totalPages: number = 0;
  progressValue: number = 0;
  characters: Observable<CharacterModel[]> = new Observable();
  parameterResponse: ParameterResponse = new ParameterResponse();

  ngOnInit(): void {
    this.awaitLoading();
    this.getInitialCharacters();
    this.getParametersResponse();
  }

  awaitLoading(): Subscription {
    return this._loadingControl.observableLoading().subscribe(
      (loading) => (this.loading = loading)
    );
  }

  getParametersResponse(): Subscription {
    return this._coreService.getParametersResponse().subscribe((parameters) => {
      this.parameterResponse = parameters;
      const totalPages = this.parameterResponse.data.total ?? 0;
      this.totalPages = CountPages.countPage(totalPages);
    });
  }

  getInitialCharacters(): Observable<CharacterModel[]> {
    return (this.characters = this._getCharacters.getCharacters().pipe(
      map((response: CharacterModel[]) => {
        this.progressValue = 0;
        return response;
      })
    ));
  }

  getOrder(order: string): Observable<CharacterModel[]> {
    this._orderBy = order;
    return (this.characters = this._getCharacters
      .getCharacters(order, this._countPage)
      .pipe(map((resp: CharacterModel[]) => resp)));
  }

  filterCharacter(name: string): Observable<CharacterModel[]> {
    if (!!name) {
      return (this.characters = this._getFilterCharacter
        .filterCharacter(name)
        .pipe(map((resp: CharacterModel[]) => resp)));
    }
    return (this.characters = this._getCharacters
      .getCharacters(this._orderBy, this._countPage)
      .pipe(map((resp: CharacterModel[]) => resp)));
  }

  handlerPages(event: Paginator): Observable<CharacterModel[]> {
    this._countPage = (
      Number(event.pageIndex) * Number(event.pageSize)
    ).toString();
    this.progressValue = 100;
    return (this.characters = this._getCharacters
      .getCharacters(this._orderBy, this._countPage)
      .pipe(
        first(),
        map((resp: CharacterModel[]) => resp),
        finalize(() => (this.progressValue = 0))
      ));
  }
}
