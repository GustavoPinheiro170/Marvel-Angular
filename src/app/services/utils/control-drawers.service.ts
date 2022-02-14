import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ControlDrawersService {
  constructor() {}

  private _othersIdsOpened: Array<number> = [];

  $idOpened: BehaviorSubject<any> = new BehaviorSubject([]);

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
    this.$idOpened.next(this._othersIdsOpened);
  }
  private addIdOpened(id: number) {
    this._othersIdsOpened.push(id);
    this.$idOpened.next(this._othersIdsOpened);
  }

  private deleteOtherOpened(id: number) {
    if (!this._othersIdsOpened.includes(id)) {
      this._othersIdsOpened.splice(-this._othersIdsOpened.length);
      this._othersIdsOpened.push(id);
    }
    this.$idOpened.next(this._othersIdsOpened);
  }
}
