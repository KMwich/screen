import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private _window = this._document.defaultView!;
  private _width$ = new BehaviorSubject<number>(this._window.innerWidth);
  private _height$ = new BehaviorSubject<number>(this._window.innerHeight);
  private _screenWidth$ = new BehaviorSubject<number>(this._window.innerWidth);
  private _screenHeight$ = new BehaviorSubject<number>(this._window.innerHeight);

  get width$() {
    return this._width$.asObservable();
  }

  get height$() {
    return this._height$.asObservable();
  }

  get screenWidth$() {
    return this._screenWidth$.asObservable();
  }

  get screenHeight$() {
    return this._screenHeight$.asObservable();
  }

  get width() {
    return this._width$.value;
  }

  get height() {
    return this._height$.value;
  }

  get screenWidth() {
    return this._screenWidth$.value;
  }

  get screenHeight() {
    return this._screenHeight$.value;
  }

  constructor(
    @Inject(DOCUMENT)
    private _document: Document
  ) {}

  setWidthHeight(width: number, height: number) {
    this._width$.next(width);
    this._height$.next(height);
  }

  setScreenWidthHeight() {
    this._screenWidth$.next(this._window.innerWidth);
    this._screenHeight$.next(this._window.innerHeight);
  }
}
