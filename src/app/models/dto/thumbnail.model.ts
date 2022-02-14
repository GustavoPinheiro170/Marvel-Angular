export class ThumbnailModel{
  path?: string;
  extension?: string;
  urlImage?: string;

  constructor(thumb?: Partial<ThumbnailModel>){
    this.urlImage = `${thumb?.path}.${thumb?.extension}`
  }
}
