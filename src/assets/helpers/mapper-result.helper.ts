import { CharacterModel } from "src/app/models/dto/character.model";

export class MapperResult {

  public static mapperResponse(response: CharacterModel[]): CharacterModel[]{
    return response.map((resp) => new CharacterModel(resp))
  }
}
