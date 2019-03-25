import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreService } from './core.service';
import { AppSnackbarModule } from './app-snackbar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor';
import { PageNotFoundModule } from './page-not-found';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppSnackbarModule,
    PageNotFoundModule,
  ],
  providers: [
    CoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule { }
