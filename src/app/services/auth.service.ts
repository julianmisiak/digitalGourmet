import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {LocalStorageService} from '../../utils/local-storage.service';
import {environment} from '../environments/environment';


export class TokenWrapper {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient, private localStorageService: LocalStorageService) {
  }

  public login(userParam: string, passwordParam: string): Observable<TokenWrapper> {
    const baseUrl = environment.apiUrl;
    // @ts-ignore

    return this.http.post<TokenWrapper>(`${baseUrl}/login`,
      {
        username: 'Administrador',
        password: '12345'
      }).pipe(
      tap((response: TokenWrapper) => this.localStorageService.saveDataInStorage(LocalStorageService.TOKEN, response.token)),
      catchError(this.handlerError('login', []))
    );
  }

  private handlerError<T>(operation: string, result?: T) {
    console.error( JSON.stringify('error.message: ' + operation));
    return (error: Response): Observable<T> => {
      console.error(`${operation} failed: ${JSON.stringify(error)}`);
      return of(result as T);
    };
  }

  public getStatus() {
    return this.localStorageService.getItemData(LocalStorageService.TOKEN);
  }
}
