import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { APP_CONFIG, APP_DI_CONFIG } from './app-config.constants';
import { HomeModule } from './home/home.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    PageNotFoundModule
  ],
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
