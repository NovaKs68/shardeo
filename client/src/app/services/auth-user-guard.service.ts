import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthTokenService } from "./auth-token.service";
import { JwtHelperService } from "@auth0/angular-jwt";

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuardService {

  redirectUrl: any;

  constructor(private authTokenService: AuthTokenService,
              private router: Router) { }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    try {
      if (this.authTokenService.isTokenValid()) {

        const token = jwtHelper.decodeToken(this.authTokenService.getToken());
        const regexUrl = /^\/admin$/;

        if (regexUrl.test(state.url)) {
          if (token.admin === true) {
            return true;
          } else {
            this.router.navigate(['/populaire']);
          }
        } else {
          return true;
        }
      } else {
        this.redirectUrl = state.url;
        this.router.navigate(['connection']);
      }
    } catch {
      this.redirectUrl = state.url;
      this.router.navigate(['connection']);
    }

  }
}
