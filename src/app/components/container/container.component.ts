import { Component, OnInit } from '@angular/core';
import { finalize, first, map, Observable, Subscription } from 'rxjs';
import { Paginator } from 'src/app/models/dto/paginator.model';
import { ParameterResponse } from 'src/app/models/dto/parameters.model';
import { CharacterModel } from 'src/app/models/dto/character.model';
import { GetCharactersService } from 'src/app/services/characters/get-characters.service';
import { OrderBy } from 'src/assets/enums/orderBy.enum';
import { CountPages } from 'src/assets/helpers/count-pages.helper';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  constructor(private readonly _getCharacters: GetCharactersService) {
  }

  private _orderBy: string = OrderBy.Name;
  private _countPage: string = '0';

  loading: boolean = false;
  totalPages: number = 0;
  progressValue: number = 0;
  characters: Observable<CharacterModel[]> = new Observable();
  parameterResponse: ParameterResponse = new ParameterResponse();

  ngOnInit(): void {
    this.getParametersResponse();
    this.getInitialCharacters();
    this.setLoading();
  }

  setLoading(): Subscription {
    return this._getCharacters.$loading.subscribe(
      (loading) => (this.loading = loading)
    );
  }

  getParametersResponse(): Subscription {
    return this._getCharacters
      .getParametersResponse()
      .subscribe((parameters) => {
        this.parameterResponse = parameters;
        const totalPages = this.parameterResponse.data.total ?? 0;
        this.totalPages = CountPages.countPage(totalPages);
      });
  }

  getInitialCharacters(): Observable<CharacterModel[]> {
    return (this.characters = this._getCharacters.getCharacters().pipe(
      map((response: CharacterModel[]) => {
        this._getCharacters.$loading.next(true);
        this.progressValue = 0;
        return response;
      })
    ));
  }

  getOrder(order: string): Observable<CharacterModel[]> {
    this._orderBy = order;
    this._getCharacters.$loading.next(true);
    return (this.characters = this._getCharacters
      .getCharacters(order, this._countPage)
      .pipe(map((resp) => resp)));
  }

  filterCharacter(name: string): Observable<CharacterModel[]> {
    this._getCharacters.$loading.next(true);
    if (!!name) {
      return (this.characters = this._getCharacters
        .filterCharacter(name)
        .pipe(map((resp) => resp)));
    }
    return (this.characters = this._getCharacters
      .getCharacters(this._orderBy, this._countPage)
      .pipe(map((resp) => resp)));
  }

  handlerPages(event: Paginator): Observable<CharacterModel[]> {
    this._countPage = (
      Number(event.pageIndex) * Number(event.pageSize)
    ).toString();
    this.progressValue = 100;
    this._getCharacters.$loading.next(true);
    return (this.characters = this._getCharacters
      .getCharacters(this._orderBy, this._countPage)
      .pipe(first())
      .pipe(
        map((resp) => resp),
        finalize(() => (this.progressValue = 0))
      ));
  }
}
