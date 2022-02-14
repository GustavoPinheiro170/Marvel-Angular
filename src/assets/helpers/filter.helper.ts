import { Observable } from 'rxjs';
import { CharacterModel } from 'src/app/models/dto/character.model';

export class FilterHelper {
  public static filteredCharacter: CharacterModel[] = [];

  public static filterCharacter(
    characters: Observable<Array<CharacterModel>>,
    name: string
  ): CharacterModel[] {
    let personsFiltered: CharacterModel[] = [];
    characters.subscribe((character) => {
      personsFiltered = character.filter((char) =>
        char.name.toLowerCase().includes(name.toLocaleLowerCase())
      );
    });
    return personsFiltered;
  }
}
