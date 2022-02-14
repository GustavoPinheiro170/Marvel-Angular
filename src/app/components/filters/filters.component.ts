import { Component, EventEmitter, Output } from '@angular/core';
import { GetCharactersService } from 'src/app/services/characters/get-characters.service';
import { OrderBy } from 'src/assets/enums/orderBy.enum';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  constructor() {}

  @Output() filterCharacter: EventEmitter<string> = new EventEmitter();
  @Output() orderSelected: EventEmitter<string> = new EventEmitter();

  public orderBy = OrderBy;
  public selected = new FormControl('name');
  public filter = new FormControl('');

  orderByCharacters(order?: OrderBy | undefined) {
    return this.orderSelected.emit(order);
  }

  filterCharacters(name: string) {
    return this.filterCharacter.emit(name);
  }
}
