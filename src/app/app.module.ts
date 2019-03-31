import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home';
import { RegisterModule } from './register';
import { CoreModule } from './core/core.module';
import { APP_CONFIG, APP_DI_CONFIG } from './core/config/app-config.constants';
import { LoginModule } from './login';
import { AlreadyLoggedInGuard } from './core/already-logged-in-guard';
import { PageNotFoundModule } from './core/page-not-found';
import { SharedModule } from './shared/shared.module';
import { UserService } from './shared/services';

function fetchUserPermissions(service: UserService) {
  console.log('under main fetchUserPermissions');
  return () => service.fetchUserPermissions();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    PageNotFoundModule,
    RegisterModule,
    LoginModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: APP_DI_CONFIG,
      multi: true
    },
    {
      provide: APP_INITIALIZER, useFactory: fetchUserPermissions, deps: [UserService], multi: true
    },
    AlreadyLoggedInGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
