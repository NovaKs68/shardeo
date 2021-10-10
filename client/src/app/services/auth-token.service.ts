import { EventEmitter, Injectable, Output } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService;

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  private authToken;
  @Output() changeTokenValidity: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.authToken = localStorage.getItem('token') || '{}';
  }

  setAuthToken(token: any) {
    localStorage.setItem('token', token);
    this.authToken = token;
    this.changeTokenValidity.emit(!jwtHelper.isTokenExpired(this.authToken));
  }

  getToken() {
    return this.authToken;
  }

  clearAuthToken() {
    this.authToken = '{}';
    localStorage.clear();
    this.changeTokenValidity.emit(false);
  }

  isTokenValid(): boolean {
    const tokenValid = !jwtHelper.isTokenExpired(this.authToken);
    this.changeTokenValidity.emit(tokenValid);
    return tokenValid;
  }

  decodeToken() {
    return jwtHelper.decodeToken(this.authToken);
  }
}
