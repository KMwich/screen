import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DrawerService } from './services/drawer.service';
import { DrawerComponent } from './components/drawer/drawer.component';
import { CommonModule } from '@angular/common';
import { DeviceService } from './services/device.service';
import { VideoComponent } from './components/video/video.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { VideoService } from './services/video.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryService } from './services/history.service';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    DrawerComponent,
    VideoComponent,
    OverlayComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    DrawerService,
    DeviceService,
    VideoService,
    HistoryService
  ]
})
export class AppModule { }
