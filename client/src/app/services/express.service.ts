import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExpressService {

  /**
   * Define the backend port
   */
  public domain: string;

  constructor(private http: HttpClient) {
    this.domain = '/api';
  }

  /**
   * get url
   * @return domain
   */
  public getDomain(): string {
    return this.domain;
  }

  /**
   * post request to express and get the response
   * @param target
   * @param contentPost
   */
  postExpress(target: string, contentPost: string): Observable<any> {
    return this.http.post(this.domain + '/' + target, contentPost);
  }
}
