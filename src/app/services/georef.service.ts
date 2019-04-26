import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeorefService {
  public baseUrlGeoref = 'http://apis.datos.gob.ar/georef/api';

  constructor(private httpClient: HttpClient) {
  }

  public getProvince() {
    const params = new HttpParams().set('campos', 'nombre');
    return this.httpClient.get<any>(`${this.baseUrlGeoref}/provincias`, {params});
  }

  public getDictrictList(provinceName: string) {
    const params = new HttpParams().set('provincia', provinceName);
    return this.httpClient.get<any>(`${this.baseUrlGeoref}/departamentos`, {params});
  }

  public getLocationList(provinceName: string, districtName: string) {
    const params = new HttpParams()
      .set('provincia', provinceName)
      .set('departamento', districtName);

    return this.httpClient.get<any>(`${this.baseUrlGeoref}/localidades`, {params});
  }

  public getStreetList(districtName: string, streetName: string) {
    const params = new HttpParams()
      .set('departamento', districtName)
      .set('direccion', streetName);

    return this.httpClient.get<any>(`${this.baseUrlGeoref}/direcciones`, {params});
  }


}
