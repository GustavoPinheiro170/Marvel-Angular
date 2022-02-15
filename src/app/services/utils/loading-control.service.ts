import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingControlService {
  constructor() {
    this.$loading.next(true);
  }

  private $loading: BehaviorSubject<any> = new BehaviorSubject(true);

  setLoading(loading: boolean): void {
    return this.$loading.next(loading);
  }

  observableLoading() {
    return this.$loading.asObservable();
  }
}
