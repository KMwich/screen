import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private _opened$ = new BehaviorSubject(false);

  get opened$() {
    return this._opened$.asObservable();
  }

  get opened() {
    return this._opened$.value;
  }

  constructor() { }

  toggle() {
    this._opened$.next(!this._opened$.value);
  }

  open() {
    if (!this._opened$.value) {
      this._opened$.next(true);
    }
  }

  close() {
    if (this._opened$.value) {
      this._opened$.next(false);
    }
  }
}
