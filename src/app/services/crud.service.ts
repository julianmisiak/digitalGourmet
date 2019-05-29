import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpHeaderService} from '../../utils/http-header.service';
import {environment} from '../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MzToastService} from 'ngx-materialize';
import {of} from 'rxjs/internal/observable/of';
import {AuthService} from './auth.service';
import {Constant} from "../../utils/Constant";

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  private baseUrl = environment.apiUrl;
  url: string;

  constructor(private router: Router, private httpClient: HttpClient,
              private httpHeaders: HttpHeaderService, public toastService: MzToastService,
              public authService: AuthService, private constant: Constant) {
  }

  public getList(isActive) {
    const headers = this.httpHeaders.getHeaders();
    const params = new HttpParams().set('isActive', isActive);
    return this.httpClient.get<any[]>(`${this.url}`, {params, headers})
      .pipe(catchError(this.handlerError('Listado', {}))
      );
  }

  public save(valueObject): Observable<boolean> {
    const headers = this.httpHeaders.getHeaders();
    // @ts-ignore
    return this.httpClient.post<boolean>(`${this.url}`, valueObject, {headers})
      .pipe(catchError(this.handlerError('Grabado', {})));
  }

  public delete(oid: number) {
    const headers = this.httpHeaders.getHeaders();
    const params = new HttpParams().set('oid', oid.toString());
    return this.httpClient.delete<boolean>(`${this.url}`, {params, headers})
      .pipe(catchError(this.handlerError('Listado de elemntos', {}))
      );
  }

  public setNameService(serviceName: string) {
    this.url = this.baseUrl + '/' + serviceName;
  }


  private handlerError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      this.toastService.show(`Error en la operación ${operation}. Mensaje: ${this.getMessage(error)}`, this.constant.timeMessage);
      return of(result as T);
    };
  }

  public getMessage(error: any): string {
    console.log(JSON.stringify(error));
    let errorMessage = '';
    if (error.status === 0) {
      errorMessage = 'Falló la conexión con el servicio';
    } else if (error.status === 403) {
      this.authService.closeSession();
    } else {
      errorMessage = `${error.error.description}`;
    }

    return errorMessage;
  }

}
