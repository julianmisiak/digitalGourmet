import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public static TOKEN = 'token';

  constructor() { }

  public saveObjetInStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public saveDataInStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getItemObject(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  public getItemData(key: string) {
    return localStorage.getItem(key);
  }
}
