import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApplyHistory } from '../interfaces/apply-history.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private readonly APPLY_HISTORY_KEY = 'APPLY_HISTORY'
  private _applyHistories$!: BehaviorSubject<ApplyHistory[]>

  get applyHistories$() {
    return this._applyHistories$.asObservable()
  }

  constructor() {
    this._init()
  }

  private _init() {
    let data: ApplyHistory[] = []
    try {
      data = JSON.parse(localStorage.getItem(this.APPLY_HISTORY_KEY) || '[]') as ApplyHistory[];
      if (!Array.isArray(data)) {
        data = []
      }
    } catch {}
    this._applyHistories$ = new BehaviorSubject(data)
    this.applyHistories$.subscribe((histories) => {
      localStorage.setItem(this.APPLY_HISTORY_KEY, JSON.stringify(histories))
    })
  }

  addApplyHistory(history: ApplyHistory) {
    const applyHistories = this._applyHistories$.value.filter(e => e.label !== history.label);
    this._applyHistories$.next([history, ...applyHistories.slice(0, 9)])
  }
}
