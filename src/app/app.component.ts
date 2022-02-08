import { Component, HostListener } from '@angular/core';
import { VideoService } from './services/video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'screen';

  constructor(private videoService: VideoService) {}

  @HostListener('window:resize')
  onWindowResize() {
    this.videoService.setScreenWidthHeight();
  }

}
