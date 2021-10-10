import { Injectable } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Media} from "../models/media";
import {ExpressService} from "./express.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  domain: string;
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };

  constructor(private expressService: ExpressService,
              private httpClient?: HttpClient) {
    this.domain = expressService.getDomain();
  }

  getMedias(): Observable<any> {
    return this.httpClient!
      .get<Media[]>(`${this.domain}/media`, this.httpOptions)
      .pipe();
  }

  postMedia(media: Media, file: File) {
    return new Promise((resolve, reject) => {
      console.log(JSON.stringify(file));
      const token = localStorage.getItem("token");
      const userLocalStorage = JSON.parse(localStorage.getItem('user')!)
      const body = new FormData();
      body.append('media', JSON.stringify(media));
      body.append('image', file);
      body.append('token', token!);
      body.append('id_user', userLocalStorage.id_user);
      /*const test = new FormData();
      test.append('media', JSON.stringify(media));
      test.append('image', file);
      console.log(test);*/
      // const body = {media: media, image: file, token: token, id_user: userLocalStorage.id_user};
      console.log(body);
      this.httpClient!.post<Media>(`${this.domain}/media/`, body).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

  getMediasByCreator(idUser: number): Observable<any> {
    return this.httpClient!
      .get<Media[]>(`${this.domain}/media/User/${idUser}`, this.httpOptions)
      .pipe();
  }
}
