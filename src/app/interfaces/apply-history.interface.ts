import { DeviceInfo } from './device-info.interface';

export interface ApplyHistory {
  label: string;
  width: number;
  height: number;
  device: DeviceInfo;
  framerate: number;
}
