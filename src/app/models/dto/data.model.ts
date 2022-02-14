import { CharacterModel } from "./character.model"

export class DataModel {
    offset?: number
    limit?: number
    total?: number
    count?: number
    results: Array<CharacterModel>

    constructor(data? : Partial<DataModel>){
      this.total = data?.total ?? 0
      this.results = data?.results ?? []
    }
}
