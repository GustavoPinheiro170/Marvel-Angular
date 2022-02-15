import { Component, Inject,  OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { CharacterModel } from 'src/app/models/dto/character.model';
import { GetIdCharacterService } from 'src/app/services/characters/get-id-character.service';
import { LoadingControlService } from 'src/app/services/utils/loading-control.service';

@Component({
  selector: 'app-details-comics',
  templateUrl: './details-comics.component.html',
  styleUrls: ['./details-comics.component.scss'],
})
export class DetailsComicsComponent implements OnInit {
  constructor(
    private readonly _getIdCharacter: GetIdCharacterService,
    private readonly _loadingControl: LoadingControlService,
    public dialogRef: MatDialogRef<DetailsComicsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CharacterModel
  ) {
    this._loadingControl.observableLoading()
      .pipe(debounceTime(1000))
      .subscribe((value) => (this.setSpinner = value));
  }
  public setSpinner: boolean | any = true;
  public emptyDetails: boolean = false;
  public comicDetails: Observable<CharacterModel[]> = new Observable();

  ngOnInit(): void {
    this.comicDetails = this._getIdCharacter.getIdCharacter(this.data?.id).pipe(
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
