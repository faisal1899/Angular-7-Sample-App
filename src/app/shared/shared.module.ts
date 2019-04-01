import { NgModule } from '@angular/core';

import { AppBackgroundColorDirective } from './directives/app-background-color.directive';
import { CheckUserPermissionsDirective } from './directive/check-user-permissions.directive';

@NgModule({
  imports: [],
  exports: [
    AppBackgroundColorDirective,
    CheckUserPermissionsDirective,
  ],
  declarations: [
    AppBackgroundColorDirective,
    CheckUserPermissionsDirective,
  ],
  providers: [],
})
export class SharedModule { }
