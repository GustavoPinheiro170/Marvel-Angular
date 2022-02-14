import { Component, Inject,  OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { debounceTime, map, Observable } from 'rxjs';
import { CharacterModel } from 'src/app/models/dto/character.model';
import { GetCharactersService } from 'src/app/services/characters/get-characters.service';

@Component({
  selector: 'app-details-comics',
  templateUrl: './details-comics.component.html',
  styleUrls: ['./details-comics.component.scss'],
})
export class DetailsComicsComponent implements OnInit {
  constructor(
    private readonly _getCharacter: GetCharactersService,
    public dialogRef: MatDialogRef<DetailsComicsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CharacterModel
  ) {
    this._getCharacter.$loading
      .pipe(debounceTime(1000))
      .subscribe((value) => (this.setSpinner = value));
  }
  public setSpinner: boolean = true;
  public emptyDetails: boolean = false;
  public comicDetails: Observable<CharacterModel[] | any> = new Observable();

  ngOnInit(): void {
    this.comicDetails = this._getCharacter.getIdCharacter(this.data.id).pipe(
      map((character: CharacterModel[]) => {
        if (!character.length) {
          this.emptyDetails = true;
        }
        return character;
      })
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  capitalize(name: string) {
    return name.charAt(0).toUpperCase() + name.substr(1);
  }
}
