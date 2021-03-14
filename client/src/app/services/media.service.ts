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
      console.log(file);
      const body = new FormData();
      body.append('media', JSON.stringify(media));
      body.append('image', file)
      this.httpClient!.post<Media>(`${this.domain}/media/`, body).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
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
