import { EventsModel } from './events.model';

export class EventsInternalModel {
  available?: number;
  collectionURI?: string;
  items?: Array<EventsModel>;
  returned?: number;
}
