import {
  Component,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  @ViewChild(MatDrawer)
  drawer!: MatDrawer;

  get opened$() {
    return this._drawerService.opened$;
  }

  constructor(private _drawerService: DrawerService) {}

  onDrawOpenedChange(opened: boolean) {
    if (this._drawerService.opened !== opened) {
      if (opened) {
        this._drawerService.open();
      } else {
        this._drawerService.close();
      }
    }
  }
}
