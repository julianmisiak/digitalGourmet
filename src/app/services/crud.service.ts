import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpHeaderService} from '../../utils/http-header.service';
import {environment} from '../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  private baseUrl = environment.apiUrl;
  url: string;

  constructor(private router: Router, private httpClient: HttpClient, private httpHeaders: HttpHeaderService) {
  }

  public getList(isActive) {
    const headers = this.httpHeaders.getHeaders();
    const params = new HttpParams().set('isActive', isActive);
    return this.httpClient.get<any[]>(`${this.url}`, {params, headers});
  }

  public save(valueObject): Observable<boolean> {
    const headers = this.httpHeaders.getHeaders();
    return this.httpClient.post<boolean>(`${this.url}`, valueObject
      , {headers});
  }

  public delete(oid: number) {
    const headers = this.httpHeaders.getHeaders();
    const params = new HttpParams().set('oid', oid.toString());
    return this.httpClient.delete<boolean>(`${this.url}`, {params, headers});
  }

  public setNameService(serviceName: string) {
    this.url = this.baseUrl + '/' + serviceName;
  }
}
