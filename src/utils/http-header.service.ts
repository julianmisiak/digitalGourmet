import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {

  constructor(private localStorageService: LocalStorageService) { }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('authorization', this.localStorageService.getItemData(LocalStorageService.TOKEN));
  }
}
