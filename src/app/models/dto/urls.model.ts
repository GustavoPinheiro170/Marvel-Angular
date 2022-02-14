export class UrlsModel {
  type: string;
  url?: string;

  constructor(urls? : Partial<UrlsModel>) {
    this.type = urls?.type ?? ""
  }
}
