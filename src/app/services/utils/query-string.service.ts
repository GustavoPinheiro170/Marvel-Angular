import { Injectable } from '@angular/core';
import { stringify } from 'query-string';

@Injectable({
  providedIn: 'root',
})
export class QueryStringService {
  constructor() {}

  buildQueryString(filterParams?: Object) {
    return filterParams
      ? '?' + stringify(filterParams, { skipNull: true })
      : '';
  }
}
