import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ExpressService} from "./express.service";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {UserPreview} from "../models/userPreview";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$ = new BehaviorSubject<User>(new User());
  userPreview$ = new BehaviorSubject<UserPreview>(new UserPreview());
  domain: string;
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };

  constructor(private expressService: ExpressService,
              private httpClient?: HttpClient) {
    this.domain = expressService.getDomain();
  }

  updateUser(): boolean {
    const userLocalStorage = JSON.parse(localStorage.getItem('user')!);
    this.getUserById(userLocalStorage.id_user).subscribe(res => {
      console.log(res);
      if (res) {
        this.user$.next(res.response);
        this.userPreview$.next(res.response);
        return true;
      } else {
        return false;
      }
    });
    return false;
  }

  getUsers(): Observable<any> {
    return this.httpClient!
      .get<User[]>(`${this.domain}/user`, this.httpOptions)
      .pipe();
  }

  getUserById(idUser: number): Observable<any> {
    return this.httpClient!
      .get<any>(`${this.domain}/user/${idUser}`, this.httpOptions)
      .pipe();
  }

  postUser(user: User, file: File) {
    return new Promise((resolve, reject) => {
      const body = new FormData();
      body.append('user', JSON.stringify(user));
      body.append('image', file);
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

  putBanner(idUser: number, file: File) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      const userLocalStorage = JSON.parse(localStorage.getItem('user')!);
      const user = { id_user: idUser };
      const body = new FormData();
      body.append('user', JSON.stringify(user));
      body.append('image', file);
      body.append('token', token!);
      body.append('id_user', userLocalStorage.id_user);

      this.httpClient!.put<User>(`${this.domain}/user/putBanner`, body).subscribe(
        (response) => {
          console.log(response);
          resolve(response);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

  putDescription(idUser: number, description: string) {
    return new Promise((resolve, reject) => {

      const token = localStorage.getItem("token");
      const userLocalStorage = JSON.parse(localStorage.getItem('user')!);
      const user = { id_user: idUser, biography: description };
      const body = { user: user, token: token, id_user: userLocalStorage.id_user }

      this.httpClient!.put<User>(`${this.domain}/user/putDescription`, body).subscribe(
        (response) => {
          console.log(response);
          resolve(response);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

  putPortfolio(idUser: number) {
    return new Promise((resolve, reject) => {

      const token = localStorage.getItem("token");
      const userLocalStorage = JSON.parse(localStorage.getItem('user')!);
      const user = { id_user: idUser, portfolio: true };
      const body = { user: user, token: token, id_user: userLocalStorage.id_user };

      this.httpClient!.put<User>(`${this.domain}/user/putPortfolio`, body).subscribe(
        (response) => {
          console.log(response);
          resolve(response);
        },
        (error) => {
          console.log(error);
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

  putUserByUser(user: User) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      const userLocalStorage = JSON.parse(localStorage.getItem('user')!);
      this.httpClient!.put<any>(`${this.domain}/user/modifyUserByUser`, {user: user, token: token, id_user: userLocalStorage.id_user}).subscribe(
        (response: { success: boolean }) => {
          userLocalStorage.first_name = user.first_name;
          userLocalStorage.last_name = user.last_name;
          userLocalStorage.email = user.email;
          userLocalStorage.password = user.password;
          localStorage.setItem('user', JSON.stringify(userLocalStorage));
          this.user$.value.first_name = user.first_name;
          this.user$.value.last_name = user.last_name;
          this.user$.value.email = user.email;
          this.user$.value.password = user.password;
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  checkPassword(password: string) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      const userLocalStorage = JSON.parse(localStorage.getItem('user')!);
      this.httpClient!.post<User>(`${this.domain}/user/checkPassword`, {password: password, token: token, id_user: userLocalStorage.id_user}).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  changeLastName(idUser: number, lastName: string) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      const userLocalStorage = JSON.parse(localStorage.getItem('user')!);
      const user = { id_user: idUser, last_name: lastName };
      console.log(user);
      this.httpClient!.put<User>(`${this.domain}/user/changeLastName`, {user: user, token: token, id_user: userLocalStorage.id_user}).subscribe(
        (response) => {
          userLocalStorage.last_name = user.last_name;
          localStorage.setItem('user', JSON.stringify(userLocalStorage));
          this.user$.value.last_name = user.last_name;
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  changeFirstName(idUser: number, firstName: string) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      const userLocalStorage = JSON.parse(localStorage.getItem('user')!);
      const user = { id_user: idUser, first_name: firstName }
      console.log(user);
      this.httpClient!.put<User>(`${this.domain}/user/changeFirstName`, {user: user, token: token, id_user: userLocalStorage.id_user}).subscribe(
        (response) => {
          userLocalStorage.first_name = user.first_name;
          localStorage.setItem('user', JSON.stringify(userLocalStorage));
          this.user$.value.first_name = user.first_name;
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  changeEmail(idUser: number, email: string) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      const userLocalStorage = JSON.parse(localStorage.getItem('user')!);
      const user = { id_user: idUser, email: email }
      console.log(user);
      this.httpClient!.put<User>(`${this.domain}/user/changeEmail`, {user: user, token: token, id_user: userLocalStorage.id_user}).subscribe(
        (response) => {
          userLocalStorage.email = user.email;
          localStorage.setItem('user', JSON.stringify(userLocalStorage));
          this.user$.value.email = user.email;
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  changePassword(idUser: number, password: string) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      const userLocalStorage = JSON.parse(localStorage.getItem('user')!);
      const user = { id_user: idUser, password: password }
      console.log(user);
      this.httpClient!.put<User>(`${this.domain}/user/changePassword`, {user: user, token: token, id_user: userLocalStorage.id_user}).subscribe(
        (response) => {
          userLocalStorage.password = user.password;
          localStorage.setItem('user', JSON.stringify(userLocalStorage));
          this.user$.value.password = user.password;
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
