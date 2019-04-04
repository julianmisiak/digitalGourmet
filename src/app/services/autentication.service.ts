import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {HttpHeaderService} from '../../utils/http-header.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  public baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private httpHeaders: HttpHeaderService) { }

  public loginWithEmail(email: string, password: string) {
    const headers = this.httpHeaders.getHeaders();
    const params = new HttpParams().set('id', email);
    return this.httpClient.get(`${this.baseUrl}/ping`, { params,  headers});
  }
}
