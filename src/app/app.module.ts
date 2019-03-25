import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home';
import { RegisterModule } from './register';
import { CoreModule } from './core/core.module';
import { APP_CONFIG, APP_DI_CONFIG } from './core/config/app-config.constants';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    RegisterModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: APP_DI_CONFIG,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
