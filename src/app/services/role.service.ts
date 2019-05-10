import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HttpHeaderService} from '../../utils/http-header.service';
import {Role} from '../model/Role';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public baseUrl = environment.apiUrl;

  constructor(private router: Router, private httpClient: HttpClient, private httpHeaders: HttpHeaderService) {
  }

  public getRoleList(isActive) {
    const headers = this.httpHeaders.getHeaders();
    const params = new HttpParams().set('isActive', isActive);
    return this.httpClient.get<Role[]>(`${this.baseUrl}/role`, {params, headers});
  }

  public save(role: Role): Observable<boolean> {
    const headers = this.httpHeaders.getHeaders();
    console.log('role.accessResources: ' + role.accessResources);
    // @ts-ignore
    return this.httpClient.post<boolean>(`${this.baseUrl}/role`, {
      oid: role.oid,
      name: role.name,
      description: role.description,
      createTimestamp: role.createTimestamp,
      creationUser: role.creationUser,
      accessResources: role.accessResources
    }, {headers});
  }

  public delete(oid: number) {
    const headers = this.httpHeaders.getHeaders();
    const params = new HttpParams().set('oid', oid.toString());
    return this.httpClient.delete<boolean>(`${this.baseUrl}/role`, {params, headers});
  }

  public getRoleByID(oid: number) {
    const headers = this.httpHeaders.getHeaders();
    const params = new HttpParams().set('oid', oid.toString());
    return this.httpClient.get<Role>(`${this.baseUrl}/role/id`, {params, headers});
  }
}
