import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ControlDrawersService {
  constructor() {}

  othersIdsOpened: Array<number> = [];
  private _$idOpened: BehaviorSubject<Array<number>> = new BehaviorSubject([1]);

  toggleIdOpened(id: number) {
    if (this.othersIdsOpened.includes(id)) {
      return this.isSameId();
    } else if (!this.othersIdsOpened.length) {
      return this.addIdOpened(id);
    } else {
      return this.deleteOtherOpened(id);
    }
  }

  private isSameId() {
    this.othersIdsOpened.splice(-this.othersIdsOpened.length);
    this._$idOpened.next(this.othersIdsOpened);
  }

  private addIdOpened(id: number) {
    this.othersIdsOpened.push(id);
    this._$idOpened.next(this.othersIdsOpened);
  }

  private deleteOtherOpened(id: number) {
    if (!this.othersIdsOpened.includes(id)) {
      this.othersIdsOpened.splice(-this.othersIdsOpened.length);
      this.othersIdsOpened.push(id);
    }
    this._$idOpened.next(this.othersIdsOpened);
  }

  public awaitIdOpened() : Observable<Array<number>> {
    return this._$idOpened.asObservable();
  }
}
