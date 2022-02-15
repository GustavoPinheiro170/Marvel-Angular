import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CharacterModel } from 'src/app/models/dto/character.model';
import { UrlsModel } from 'src/app/models/dto/urls.model';
import { ControlDrawersService } from 'src/app/services/utils/control-drawers.service';
import { DetailsComicsComponent } from '../details-comics/details-comics.component';

@Component({
  selector: 'app-drawer-cards',
  templateUrl: './drawer-cards.component.html',
  styleUrls: ['./drawer-cards.component.scss'],
})
export class DrawerCardsComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private readonly _controlDrawers: ControlDrawersService
  ) {
    this._controlDrawers
    .awaitIdOpened()
    .subscribe((ids: Array<number>) => (this._idOpened = ids));
  }

  @Input() character: CharacterModel;
  @Output() controlDrawersOpened: EventEmitter<number> = new EventEmitter();

  private _idOpened: Array<number> = [];
  public openDrawer: boolean = false;

  ngOnInit(): void {

  }

  capitalize(name: string) {
    return name.charAt(0).toUpperCase() + name.substr(1);
  }

  openDialog(character: CharacterModel) {
    this.dialog.open(DetailsComicsComponent, {
      minWidth: '40%',
      maxWidth: '90%',
      height: '85%',
      data: character,
    });
  }

  togglePropertyDrawer(id: number) {
    this._controlDrawers.toggleIdOpened(id);
  }

  toggleDrawers(id?: number): boolean {
    return this._idOpened.includes(id ?? 0);
  }

  trackByCards(_: number, cards: UrlsModel) {
    return cards;
  }
}
