import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeviceInfo } from '../interfaces/device-info.interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private _devices$ = new BehaviorSubject<DeviceInfo[]>([]);
  private _device$ = new BehaviorSubject<DeviceInfo | null>(null);

  get devices$() {
    return this._devices$.asObservable()
  }

  get device$() {
    return this._device$.asObservable()
  }

  get devices() {
    return this._devices$.value
  }

  get device() {
    return this._device$.value
  }

  constructor() {
    this._init()
  }
  
  private _init() {
    this._getDevices()
      .then(devices => {
        this._devices$.next(devices);
      })
  }

  setDevice(device: DeviceInfo) {
    this._device$.next(device)
  }

  private _getDevices() {
    return navigator.mediaDevices.enumerateDevices().then((devices) => {
      return devices.filter(e => e.kind === 'videoinput').map<DeviceInfo>(e => {
        let label = e.label
        const lastIndex = e.label.lastIndexOf('(')
        if (lastIndex !== -1) {
          label = label.slice(0, lastIndex).trim()
        }
        return {
          videoDeviceId: e.deviceId,
          audioDeviceId: devices.find(f => f.kind === 'audioinput' && f.groupId === e.groupId)?.deviceId,
          groupId: e.groupId,
          label: label
        }
      })
    });
  }
}
