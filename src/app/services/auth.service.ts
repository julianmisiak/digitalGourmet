import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {LocalStorageService} from '../../utils/local-storage.service';
import {environment} from '../environments/environment';
import {Router} from "@angular/router";


export class TokenWrapper {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient, private localStorageService: LocalStorageService, private router: Router) {
  }

  public login(userNameParam: string, passwordParam: string): Observable<TokenWrapper> {
    console.log('user: ' + userNameParam);
    const baseUrl = environment.apiUrl;
    // @ts-ignore

    return this.http.post<TokenWrapper>(`${baseUrl}/login`,
      {
        username: userNameParam,
        password: passwordParam
      });
  }

  public getStatus() {
    return this.localStorageService.getItemData(LocalStorageService.TOKEN);
  }

  public closeSession() {
    this.localStorageService.removeStorage(LocalStorageService.TOKEN);
    this.router.navigate(['login']);
  }
}
