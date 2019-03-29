import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSnackbarComponent } from './app-snackbar.component';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { APP_SNACK_BAR_DEFAULT_OPTIONS } from '../config/app-config.constants';

@NgModule({
  declarations: [
    AppSnackbarComponent,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: APP_SNACK_BAR_DEFAULT_OPTIONS,
    }
  ],
  entryComponents: [
    AppSnackbarComponent,
  ]
})
export class AppSnackbarModule { }
