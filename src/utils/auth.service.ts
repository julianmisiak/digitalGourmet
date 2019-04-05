import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';
import {environment} from '../app/environments/environment';


export class TokenWrapper {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient, private localStorageService: LocalStorageService) { }

  public login(): Observable<TokenWrapper> {
    const baseUrl = environment.apiUrl;
    console.log('response.token: ' + baseUrl);
    // @ts-ignore

    return this.http.post<TokenWrapper>(`${baseUrl}/login`,
      { username: 'digitalGourmet',
             password: 'digitalGourmet'
      }).pipe(
        tap((response: TokenWrapper) => this.localStorageService.saveDataInStorage(LocalStorageService.TOKEN, response.token)),
        catchError(this.handlerError('login', []))

    );
  }

  private handlerError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
