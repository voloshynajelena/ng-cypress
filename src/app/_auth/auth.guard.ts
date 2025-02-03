import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.isLoggedIn()) {
      return true;
    }

    // User is not logged in, redirect to the login page and restrict access to routes
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
