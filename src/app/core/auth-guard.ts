import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private service: UserService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.service.isLoggedIn) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
