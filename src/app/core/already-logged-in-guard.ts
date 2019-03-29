import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../shared/services';

@Injectable()
export class AlreadyLoggedInGuard implements CanActivate {
  constructor(
    private service: UserService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.service.isLoggedIn) {
      return false;
    }
    return true;
  }
}
