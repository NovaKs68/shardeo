import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ExpressService} from "./express.service";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {UserPreview} from "../models/userPreview";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  domain: string;
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };

  constructor(private expressService: ExpressService,
              private httpClient?: HttpClient) {
    this.domain = expressService.getDomain();
  }

  getUsers(): Observable<any> {
    return this.httpClient!
      .get<User[]>(`${this.domain}/user`, this.httpOptions)
      .pipe();
  }

  postUser(user: User, file: File) {
    return new Promise((resolve, reject) => {
      const body = new FormData();
      body.append('user', JSON.stringify(user));
      body.append('image', file)
      this.httpClient!.post<User>(`${this.domain}/user/`, body).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getUsersPreview(): Observable<any> {
    return this.httpClient!
      .get<UserPreview[]>(`${this.domain}/user/previews`, this.httpOptions)
      .pipe();
  }
}
