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
    console.log(JSON.stringify('isActive: ' + isActive));
    const headers = this.httpHeaders.getHeaders();
    const params = new HttpParams().set('isActive', isActive);
    return this.httpClient.get<User[]>(`${this.baseUrl}/user`, {params, headers});
  }

  public save(user: User): Observable<boolean> {
    const headers = this.httpHeaders.getHeaders();
    console.log(JSON.stringify(user));
    // @ts-ignore
    return this.httpClient.post<boolean>(`${this.baseUrl}/user`, {
      oid: user.oid,
      userName: user.userName,
      password: user.password,
      name: user.name,
      surname: user.surname,
      idCard: user.idCard,
      gender: user.gender,
      email: user.email,
      createTimestamp: user.createTimestamp,
      creationUser: user.creationUser,
    }, {headers});
  }


  public delete(oid: number) {
    const headers = this.httpHeaders.getHeaders();
    const params = new HttpParams().set('oid', oid.toString());
    return this.httpClient.delete<boolean>(`${this.baseUrl}/user`, {params, headers});
  }
}
