import {Component, Input, OnInit} from '@angular/core';
import {DualListComponent} from 'angular-dual-listbox';
import {RoleService} from '../../../../services/role.service';
import {Role} from '../../../../model/Role';
import {User} from '../../../../model/User';

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
  @Input() user: User;
  disabled = false;
  filter = false;
  keepSorted: true;

  constructor(private service: RoleService) {
  }

  ngOnInit() {
    this.getListElement();
  }

  public getListElement() {
    this.service.getRoleList(true).subscribe((data: Role[]) => {
      this.roleList = data;
      // this.roleList2 = this.roleList.filter((data2) => {
      //  return data2.oid >= 2;
      // });
    }, (error: any) => {
      console.log(JSON.stringify(error));
    });
  }

}
