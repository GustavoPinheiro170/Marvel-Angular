import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingControlService {
  constructor() {
    this.$loading.next(true);
  }

  private $loading: Subject<boolean> = new Subject();

  setLoading(loading: boolean): void {
    return this.$loading.next(loading);
  }

  observableLoading() {
    return this.$loading.asObservable();
  }
}
