import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ControlDrawersService {
  constructor() {}

  private _othersIdsOpened: Array<number> = [];
  private _$idOpened: BehaviorSubject<Array<number>> = new BehaviorSubject([1]);

  toggleIdOpened(id: number) {
    if (this._othersIdsOpened.includes(id)) {
      return this.isSameId();
    } else if (!this._othersIdsOpened.length) {
      return this.addIdOpened(id);
    } else {
      return this.deleteOtherOpened(id);
    }
  }

  private isSameId() {
    this._othersIdsOpened.splice(-this._othersIdsOpened.length);
    this._$idOpened.next(this._othersIdsOpened);
  }

  private addIdOpened(id: number) {
    this._othersIdsOpened.push(id);
    this._$idOpened.next(this._othersIdsOpened);
  }

  private deleteOtherOpened(id: number) {
    if (!this._othersIdsOpened.includes(id)) {
      this._othersIdsOpened.splice(-this._othersIdsOpened.length);
      this._othersIdsOpened.push(id);
    }
    this._$idOpened.next(this._othersIdsOpened);
  }

  public awaitIdOpened() : Observable<Array<number>> {
    return this._$idOpened.asObservable();
  }
}
