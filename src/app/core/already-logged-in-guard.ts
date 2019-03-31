import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../shared/services';

@Injectable()
export class AlreadyLoggedInGuard implements CanActivate {
  constructor(
    private service: UserService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.service.isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
