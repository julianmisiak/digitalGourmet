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
    console.log('key: ' + key);
    console.log('value: ' + value);
    localStorage.setItem(key, value);
  }

  public getItemObject(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  public getItemData(key: string) {
    return localStorage.getItem(key);
  }

  public removeStorage(key: string){
    localStorage.removeItem(key);
  }
}
