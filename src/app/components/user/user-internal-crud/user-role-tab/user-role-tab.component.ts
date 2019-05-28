import {Component, Input, OnInit} from '@angular/core';
import {DualListComponent} from 'angular-dual-listbox';
import {Role} from '../../../../model/Role';
import {User} from '../../../../model/User';
import {CrudService} from '../../../../services/crud.service';

@Component({
  selector: 'app-user-role-tab',
  templateUrl: './user-role-tab.component.html',
  styleUrls: ['./user-role-tab.component.scss']
})
export class UserRoleTabComponent implements OnInit {
  format = {
    add: 'Agregar', remove: 'Quitar', all: 'Todos', none: 'Ninguno',
    direction: DualListComponent.LTR, draggable: true, locale: 'da'
  };
  roleList: Array<Role>;
  @Input() valueObject: User;
  disabled = false;
  filter = false;
  keepSorted: true;

  constructor(private service: CrudService) {
  }

  ngOnInit() {
    this.getListElement();
  }

  public getListElement() {
    this.service.getList(true).subscribe((data: Role[]) => {
      this.roleList = data;
      // this.roleList2 = this.roleList.filter((data2) => {
      //  return data2.oid >= 2;
      // });
    }, (error: any) => {
      console.log(JSON.stringify(error));
    });
  }

}
