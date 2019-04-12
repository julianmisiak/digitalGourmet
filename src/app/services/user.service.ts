import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpHeaderService} from '../../utils/http-header.service';
import {environment} from '../environments/environment';
import {User} from '../model/User';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public baseUrl = environment.apiUrl;

  constructor(private router: Router, private httpClient: HttpClient, private httpHeaders: HttpHeaderService) {
  }

  public getUserList(isActive) {
    const headers = this.httpHeaders.getHeaders();
    const params = new HttpParams().set('isActive', isActive);
    return this.httpClient.get<User[]>(`${this.baseUrl}/user`, {params, headers});
  }

  public save(user: User): Observable<boolean> {
    const baseUrl = environment.apiUrl;
    const headers = this.httpHeaders.getHeaders();
    // @ts-ignore
    return this.httpClient.post<boolean>(`${baseUrl}/user`, {
      userName: user.userName,
      password: user.password

    }, {headers});
  }


}
