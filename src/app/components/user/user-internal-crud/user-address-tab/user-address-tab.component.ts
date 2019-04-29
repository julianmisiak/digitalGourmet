import {Component, Input, OnInit} from '@angular/core';
import {Address} from '../../../../model/Address';
import {FormGroup} from '@angular/forms';
import {User} from '../../../../model/User';

@Component({
  selector: 'app-user-address-tab',
  templateUrl: './user-address-tab.component.html',
  styleUrls: ['./user-address-tab.component.scss']
})

export class UserAddressTabComponent implements OnInit {
  address: Address;
  enabledField = false;
  @Input() form: FormGroup;
  @Input() user: User;
  provinceList: { data: { [key: string]: string } };
  districtList: { data: { [key: string]: string } };
  locationList: { data: { [key: string]: string } };
  streetList: { data: { [key: string]: string } };
  displayedColumns = ['Calle', 'Número', 'Localidad', 'Por defecto'];
  selectedRow: number = null;

  constructor() {
  }

  public getProvince() {
  }

  public getDistrictList() {
  }

  public getLocationList() {
  }

  public getStreetList() {
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

  public onIsDefaultSelectChange(value: string) {
    if (this.address.isDefault) {

      this.user.addresses.forEach((data) => {
        if (data.oid !== this.address.oid) {
          data.isDefault = false;
        }
      });
    }

  }

  public setClickedRow(address: Address) {

    if (this.selectedRow !== address.oid) {
      this.selectedRow = address.oid;
      this.enabledField = true;
      this.address = address;
    } else {
      this.selectedRow = null;
      this.enabledField = false;
      this.address = new Address();
    }
  }

  public new() {
    this.address = new Address();
    this.enabledField = true;
  }

  public save() {
    this.selectedRow = null;
    if (this.address.oid === undefined) {
      this.user.addresses.push(this.address);
    }
    this.address = new Address();
    this.enabledField = false;
  }

  public cancel() {
    this.address = new Address();
    this.enabledField = false;
    this.selectedRow = null;
  }

  public delete() {
    this.user.addresses = this.user.addresses.filter((data) => {
     return data.oid !== this.address.oid;
    });
  }

  ngOnInit() {
    this.address = new Address();
  }


}
