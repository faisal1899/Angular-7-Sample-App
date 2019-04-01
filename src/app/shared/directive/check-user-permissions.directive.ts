import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { difference } from 'lodash';
import { UserService } from '../services';

@Directive({
  selector: '[appCheckUserPermissions]'
})
export class CheckUserPermissionsDirective {
  @Input() set appCheckUserPermissions(permissions: string[]) {
    if (difference(permissions, this.userService.getUserPermissions()).length === 0) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private userService: UserService,
  ) { }

}
