import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ExpressService} from "./express.service";
import {AuthTokenService} from "./auth-token.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string | null = '';
  User: User | null = new User();
  domain: string;
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };

  constructor(private router: Router,
              private httpClient: HttpClient,
              private expressService: ExpressService,
              private authTokenService: AuthTokenService,
              private userService: UserService) {
    this.domain = expressService.getDomain();
    this.connectIfSessionExist();
  }

  storeUserData (token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authTokenService.setAuthToken(token);
  }

  public connectIfSessionExist() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem('user')!);

    if (token && user) {
      return new Promise((resolve, reject) => {
        this.httpClient.post(
          `${this.domain}/auth/checkConnectionUser`,
          {id_user: user.id_user, token: token},
          this.httpOptions)
          .subscribe(
            () => {
              this.isAuth$.next(true);
              this.userService.user$.next(user);
              this.userService.userPreview$.next(user);
            },
            (error) => {
              console.log(error);
              this.isAuth$.next(false);
              reject(error);
            }
          );
      });
    }
    return false;
  }

  createNewUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(
        `${this.domain}/auth/signup`,
        { email: email, password: password },
        this.httpOptions)
        .subscribe(
          () => {
            this.login(email, password).then(
              () => {
                resolve('success');
              }
            ).catch(
              (error) => {
                reject(error);
              }
            );
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.httpClient!.post<any>(
        `${this.domain}/auth/login`,
        { email: email, password: password },
        this.httpOptions).subscribe(
          (authData: { token: string, user: User }) => {
            this.token = authData.token;
            this.User = authData.user;
            this.isAuth$.next(true);
            this.userService.user$.next(authData.user);
            console.log(this.userService.user$);
            this.userService.userPreview$.next(authData.user);
            this.storeUserData(authData.token, authData.user);
            resolve('success');
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  logout() {
    this.isAuth$.next(false);
    this.User = null;
    this.token = null;
    this.authTokenService.clearAuthToken();
  }
}
