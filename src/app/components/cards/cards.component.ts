import { Component, Input, OnInit } from '@angular/core';
import { finalize, map, Observable, Subscription } from 'rxjs';
import { CharacterModel } from 'src/app/models/dto/character.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  constructor() {}

  @Input() $characters: Observable<CharacterModel[]> = new Observable();

  trackByCards(_: number, cards: CharacterModel) {
    return cards;
  }
}
