import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpHeaderService} from "../../utils/http-header.service";
import {environment} from "../environments/environment";
import {User} from "../model/User";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenWrapper} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public baseUrl = environment.apiUrl;

  constructor(private router: Router, private httpClient: HttpClient, private httpHeaders: HttpHeaderService) {
  }

  public getUserList() {
    const headers = this.httpHeaders.getHeaders();
    return this.httpClient.get<User[]>(`${this.baseUrl}/user`, {headers});
  }

  public save(user: User): Observable<boolean> {
    const baseUrl = environment.apiUrl;
    const headers = this.httpHeaders.getHeaders();
    console.log('user: ' + JSON.stringify(user));
    // @ts-ignore
    return this.httpClient.post<boolean>(`${baseUrl}/user`, {
      userName: user.userName,
      password: user.password

    }, {headers});
  }
}
