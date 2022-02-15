import { OrderBy } from "src/assets/enums/orderBy.enum";

export class ParamaterRequest {

  public orderBy?: OrderBy | String;

  public limit?: string;
  public offset?: string;
  public nameStartsWith? : string
  public characterId? : number

  constructor(parameters :Partial<ParamaterRequest>){
    this.orderBy = parameters?.orderBy ?? OrderBy.Name,
    this.limit = parameters?.limit ?? "12",
    this.offset = parameters?.offset ?? "0"
    this.nameStartsWith = parameters?.nameStartsWith
    this.characterId = parameters?.characterId

  }

}
