import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ExpressService} from "./express.service";
import {Observable} from "rxjs";
import {Media} from "../models/media";
import {Album} from "../models/album";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  domain: string;
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };

  constructor(private expressService: ExpressService,
              private httpClient?: HttpClient) {
    this.domain = expressService.getDomain();
  }

  getAlbums(): Observable<any> {
    return this.httpClient!
      .get<Album[]>(`${this.domain}/album`, this.httpOptions)
      .pipe();
  }
}
