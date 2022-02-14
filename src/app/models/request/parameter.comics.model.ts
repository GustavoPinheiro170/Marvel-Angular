
export class ParameterComics {
  public ts?: number;
  public apikey?: string;
  public hash?: string;
  public characterId? : number

  constructor(parameters :Partial<ParameterComics>){
    this.ts = parameters?.ts,
    this.apikey = parameters?.apikey,
    this.hash = parameters?.hash,
    this.characterId = parameters?.characterId

  }

}
