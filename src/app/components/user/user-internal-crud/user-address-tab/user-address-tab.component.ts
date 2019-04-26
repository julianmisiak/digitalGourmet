import {Component, Input, OnInit} from '@angular/core';
import {Address} from '../../../../model/Address';
import {FormGroup} from '@angular/forms';
import {User} from '../../../../model/User';
import {GeorefService} from '../../../../services/georef.service';

@Component({
  selector: 'app-user-address-tab',
  templateUrl: './user-address-tab.component.html',
  styleUrls: ['./user-address-tab.component.scss']
})

export class UserAddressTabComponent implements OnInit {
  address: Address;
  @Input() form: FormGroup;
  @Input() user: User;
  provinceList: { data: { [key: string]: string } };
  districtList: { data: { [key: string]: string } };
  locationList: { data: { [key: string]: string } };
  streetList: { data: { [key: string]: string } };
  displayedColumns = ['Calle', 'Número', 'Localidad', 'Por defecto'];
  selectedRow: number = null;
  viewInactive: false;

  constructor(private georefService: GeorefService) {
    this.getProvince();
  }

  public getProvince() {
    this.georefService.getProvince().subscribe(data => {
      const dataReciv: { [key: string]: string } = {};
      data.provincias.forEach((location: any) => {
        dataReciv[location.nombre] = null;
      });
      this.provinceList = {data: dataReciv};
    });
  }

  public getDistrictList() {
    this.georefService.getDictrictList(this.address.province).subscribe(data => {
      const dataReciv: { [key: string]: string } = {};
      data.departamentos.forEach((location: any) => {
        dataReciv[location.nombre] = null;
      });
      this.districtList = {data: dataReciv};
    });
  }

  public getLocationList() {
    this.georefService.getLocationList(this.address.province, this.address.district).subscribe(data => {
      const dataReciv: { [key: string]: string } = {};
      data.localidades.forEach((location: any) => {
        dataReciv[location.nombre] = null;
      });
      this.locationList = {data: dataReciv};
    });
  }

  public getStreetList() {
    this.georefService.getStreetList(this.address.district, this.address.street).subscribe(data => {
      const dataReciv: { [key: string]: string } = {};
      data.direcciones.forEach((location: any) => {
        dataReciv[location.calle.nombre] = null;
      });
      this.streetList = {data: dataReciv};
    });
  }

  public onProvinceSelectChange(value: string) {
    this.address.province = value;
    this.getDistrictList();
  }

  public onDiscrictSelectChange(value: string) {
    this.address.district = value;
    this.getLocationList();
  }

  public onLocationSelectChange(value: string) {
    this.address.location = value;
  }

  public onStreetSelectChange(value: string) {
    this.address.street = value;
  }

  public onStreetKeypressChange(value: string) {
    if (value.length > 3) {
      this.address.street = value;
      this.getStreetList();
    }
  }

  public onPostalCodeSelectChange(value: number) {
    this.address.postalCode = value;

  }

  public onNumberSelectChange(value: number) {
    this.address.number = value;
  }

  public setClickedRow(user: User) {
    if (this.selectedRow !== user.oid) {
      this.selectedRow = user.oid;
      this.user = user;
    } else {
      this.selectedRow = null;
      this.user = new User();
    }
  }

  public new() {
    this.address = new Address();

  }

  public save() {
    console.log('this.user: ' + JSON.stringify(this.user));
    this.user.addresses.push(this.address);
    this.address = null;
  }

  public cancel() {
    this.address = null;
  }

  ngOnInit() {
    this.address = null;
  }
}
