import { Injectable } from '@angular/core';
import {AuthTokenService} from "./auth-token.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuardService {

  redirectUrl: any;

  constructor(private authTokenService: AuthTokenService,
              private router: Router) { }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const user: any = JSON.parse(<string>localStorage.getItem('user'));

    if (this.authTokenService.isTokenValid()) {
      if (user.permission === 3) {
        return true;
      } else {
        this.router.navigate(['/popular']);
      }
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['connection']);
    }
  }
}
