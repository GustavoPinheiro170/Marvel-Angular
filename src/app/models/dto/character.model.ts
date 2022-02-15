import { EventsModel } from './events.model';
import { EventsInternalModel } from './events-internal.model';
import { UrlsModel } from './urls.model';
import { ThumbnailModel } from './thumbnail.model';

export class CharacterModel {
  public id: number;
  public description?: string;
  public modified?: string;
  public name: string;
  public resourceURI?: string;
  public thumbnail?: ThumbnailModel
  public urls?: Array<UrlsModel>;

  public comics?: EventsInternalModel;
  public events?: EventsInternalModel;
  public series?: EventsInternalModel;
  public stories?: EventsInternalModel;


  constructor(results?: CharacterModel){
    this.id = results?.id ?? 0
    this.description = results?.description ?? ""
    this.modified = results?.modified ?? ""
    this.name = results?.name ?? ""
    this.resourceURI = results?.resourceURI ?? ""
    this.urls =  results?.urls?? [new UrlsModel()];
    this.thumbnail = new ThumbnailModel(results?.thumbnail)
  }

}
