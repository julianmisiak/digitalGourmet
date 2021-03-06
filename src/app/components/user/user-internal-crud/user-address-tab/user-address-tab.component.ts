import {Component, Input, OnInit} from '@angular/core';
import {Address} from '../../../../model/Address';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../../model/User';
import {GeorefService} from '../../../../services/georef.service';
import {MzToastService} from 'ngx-materialize';
import {Constant} from '../../../../../utils/Constant';

@Component({
  selector: 'app-user-address-tab',
  templateUrl: './user-address-tab.component.html',
  styleUrls: ['./user-address-tab.component.scss']
})

export class UserAddressTabComponent implements OnInit {
  address: Address;
  form: FormGroup;
  @Input() valueObject: User;
  provinceList: { data: { [key: string]: string } };
  districtList: { data: { [key: string]: string } };
  locationList: { data: { [key: string]: string } };
  streetList: { data: { [key: string]: string } };
  displayedColumns = ['Calle', 'Número', 'Localidad', 'Por defecto'];
  selectedRow: number = null;
  requiredFiledMessage = 'Campo obligatorio';
  enabledField = false;

  errorMessages = {
    province: {
      required: this.requiredFiledMessage
    },
    district: {
      required: this.requiredFiledMessage
    },
    location: {
      required: this.requiredFiledMessage
    },
    postalCode: {
      required: this.requiredFiledMessage
    },
    street: {
      required: this.requiredFiledMessage
    },
    number: {
      required: this.requiredFiledMessage
    },
    isDepartment: {
      required: this.requiredFiledMessage
    },
    department: {
      required: this.requiredFiledMessage
    },
    isDefault: {
      required: this.requiredFiledMessage
    }
  };

  constructor(private georefService: GeorefService, private formBuilder: FormBuilder,
              public toastService: MzToastService, private constant: Constant) {
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
    this.address.district = null;
    this.address.location = null;
    this.address.postalCode = null;
    this.address.street = null;
    this.address.number = null;
    this.address.department = null;

    this.getDistrictList();
  }

  public onDiscrictSelectChange(value: string) {
    this.address.district = value;

    this.address.location = null;
    this.address.postalCode = null;
    this.address.street = null;
    this.address.number = null;
    this.address.department = null;

    this.getLocationList();
  }

  public onLocationSelectChange(value: string) {
    this.address.postalCode = null;
    this.address.street = null;
    this.address.number = null;
    this.address.department = null;

    this.address.location = value;
  }

  public onStreetKeypressChange(value: string) {
    this.address.number = null;
    this.address.department = null;
    if (value.length > 3) {
      this.address.street = value;
      this.getStreetList();
    }
  }

  public onPostalCodeSelectChange(value: number) {
    this.address.street = null;
    this.address.number = null;
    this.address.department = null;

    this.address.postalCode = value;
  }

  public onStreetSelectChange(value: string) {
    this.address.street = value;
  }


  public onNumberSelectChange(value: number) {
    this.address.number = value;
    this.address.department = null;
  }

  public onIsDefaultSelectChange(value: string) {
    if (this.address.isDefault) {

      this.valueObject.addresses.forEach((data) => {
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
    if (!this.form.valid) {
      this.toastService.show('Complete los campos obligatorios', this.constant.timeMessage);
      return;
    }

    if (!this.validateAddressDefault()) {
      return;
    }

    this.selectedRow = null;

    if (this.address.oid === undefined) {
      this.valueObject.addresses = this.valueObject.addresses.filter((data) => {
        return data !== this.address;
      });

      this.valueObject.addresses.push(this.address);
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
    this.valueObject.addresses = this.valueObject.addresses.filter((data) => {
      return data.oid !== this.address.oid;
    });
    this.address = new Address();
  }

  ngOnInit() {
    this.address = new Address();

    this.form = this.formBuilder.group({
      province: ['', this.errorMessages.province],
      district: ['', this.errorMessages.district],
      location: ['', this.errorMessages.location],
      postalCode: ['', this.errorMessages.postalCode],
      street: ['', this.errorMessages.street],
      number: ['', this.errorMessages.number],
      isDepartment: [true],
      department: ['', this.errorMessages.department],
      isDefault: [true]
    });

    this.enabledField = false;
  }

  private validateAddressDefault() {
    let matchingDefualt = false;

    if (this.address.isDefault) {
      matchingDefualt = true;
    }
    this.valueObject.addresses.forEach((data) => {
      if (data.isDefault) {
        matchingDefualt = true;
        return;
      }
    });

    if (!matchingDefualt) {
      this.toastService.show('Debe haber una dirección por defecto', this.constant.timeMessage);
      return false;
    }

    return true;
  }
}
