import {
  Component,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, debounceTime, merge, Subject, takeUntil, withLatestFrom } from 'rxjs';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  private _hideOverlay$ = new BehaviorSubject<void>(void 0);
  
  @HostBinding('style.opacity')
  opacity = 1;
  
  private _opacity$ = new BehaviorSubject(this.opacity);

  constructor(private _drawerService: DrawerService) {}

  ngOnInit(): void {
    this._hideOverlay$
      .pipe(takeUntil(this._destroy$), debounceTime(3000))
      .subscribe(() => {
        if (this._opacity$.value === 1) {
          this._opacity$.next(0);
        }
      });
    
    merge(this._drawerService.opened$, this._opacity$)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        if (this._drawerService.opened) {
          this.opacity = 0
        } else {
          this.opacity = this._opacity$.value;
        }
      })
  }

  ngOnDestroy(): void {
      this._destroy$.next()
      this._destroy$.next()
  }

  @HostListener('mousemove')
  showOverlay() {
    if (this._opacity$.value !== 1) {
      this._opacity$.next(1);
    }
    this._hideOverlay$.next();
  }

  @HostListener('mouseout')
  onWindowMouseout() {
    if (this._opacity$.value === 1) {
      this._opacity$.next(0);
    }
  }

  openSidebar() {
    this._drawerService.open();
  }
}
