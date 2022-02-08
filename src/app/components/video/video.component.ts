import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { debounceTime, filter, map, merge, Observable, switchMap } from 'rxjs';
import { VideoWidthHeight } from 'src/app/interfaces/video-size.interface';
import { DeviceService } from 'src/app/services/device.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  private _window = this._document.defaultView!;
  private _stream$!: Observable<MediaStream>;
  private _aspectedRatio$!: Observable<string>;
  private _videoWidthHeight$!: Observable<VideoWidthHeight>;

  get stream$() {
    return this._stream$;
  }

  get aspectedRatio$() {
    return this._aspectedRatio$;
  }

  get videoWidthHeight$() {
    return this._videoWidthHeight$;
  }

  @ViewChild('screen')
  screen!: ElementRef<HTMLVideoElement>;

  constructor(
    @Inject(DOCUMENT)
    private _document: Document,
    private _deviceService: DeviceService,
    private _videoService: VideoService
  ) {}

  ngOnInit(): void {
    let debounceTimeValue = 500;
    this._stream$ = merge(
      this._videoService.width$,
      this._videoService.height$,
      this._deviceService.device$
    ).pipe(
      debounceTime(debounceTimeValue),
      filter(
        (_) =>
          (this._deviceService.device ?? false) &&
          this._videoService.width > 0 &&
          this._videoService.height > 0
      ),
      switchMap(() => this._getUserMedia())
    );

    this._videoWidthHeight$ = merge(
      this._videoService.width$,
      this._videoService.height$,
      this._videoService.screenWidth$,
      this._videoService.screenHeight$
    ).pipe(
      filter(
        (_) => this._videoService.width > 0 && this._videoService.height > 0
      ),
      map(() => {
        const windowRatio = this._window.innerWidth / this._window.innerHeight;
        const videoRatio = this._videoService.width / this._videoService.height;
        const videoWidthHeight = {
          width: this._window.innerWidth,
          height: this._window.innerHeight,
        };
        if (windowRatio > videoRatio) {
          videoWidthHeight.width = this._window.innerHeight * videoRatio;
        } else {
          videoWidthHeight.height = this._window.innerWidth / videoRatio;
        }
        return videoWidthHeight;
      })
    );
  }

  onLoadedMetadata() {
    this.screen.nativeElement.play();
  }

  private _getUserMedia() {
    return navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: this._deviceService.device!.videoDeviceId,
        aspectRatio: this._videoService.width / this._videoService.height,
        width: this._videoService.width,
        height: this._videoService.height,
        frameRate: 60,
      },
      audio: this._deviceService.device!.audioDeviceId
        ? {
            deviceId: this._deviceService.device!.audioDeviceId,
          }
        : false,
    });
  }
}
