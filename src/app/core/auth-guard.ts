import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private service: UserService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.service.isLoggedIn) {
      return true;
    }
    return false;
  }
}
