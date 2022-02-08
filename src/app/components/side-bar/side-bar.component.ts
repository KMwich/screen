import { Component } from '@angular/core';
import { ApplyHistory } from 'src/app/interfaces/apply-history.interface';
import { DeviceInfo } from 'src/app/interfaces/device-info.interface';
import { DeviceService } from 'src/app/services/device.service';
import { DrawerService } from 'src/app/services/drawer.service';
import { HistoryService } from 'src/app/services/history.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  get devices$() {
    return this._deviceService.devices$;
  }

  get applyHistories$() {
    return this._historyService.applyHistories$;
  }

  device?: DeviceInfo;
  width = this._videoService.width;
  height = this._videoService.height;

  constructor(
    private _deviceService: DeviceService,
    private _videoService: VideoService,
    private _drawerService: DrawerService,
    private _historyService: HistoryService
  ) {}

  apply() {
    if (this.device && this.width > 0 && this.height > 0) {
      this._deviceService.setDevice(this.device);
      this._videoService.setWidthHeight(this.width, this.height);
      this._drawerService.close();
      this._historyService.addApplyHistory({
        label: `${this.device.label}|${this.width}|${this.height}|60`,
        width: this.width,
        height: this.height,
        device: this.device,
        framerate: 60
      })
    }
  }

  applyHistory(history: ApplyHistory) {
    const device = this._deviceService.devices.find(device => device.label === history.device.label)
    if (device) {
      this.device = history.device;
      this.width = history.width;
      this.height = history.height;
      this.apply();
    }
  }
}
