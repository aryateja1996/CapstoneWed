import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectComponent } from './project/project.component';

import {MatBadgeModule} from '@angular/material/badge';
// For MDB Angular Pro

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProserveService } from './proserve.service';
import {HammerGestureConfig, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    'bread': {
      direction: Hammer.DIRECTION_ALL,
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ContactComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatBadgeModule,
    BrowserAnimationsModule,
  ],
  providers: [ProserveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
