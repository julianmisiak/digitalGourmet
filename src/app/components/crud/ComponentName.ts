import {UserInternalCrudComponent} from '../user/user-internal-crud/user-internal-crud.component';
import {Type} from '@angular/core';
import {MzBaseModal} from 'ngx-materialize';
import {RoleInternalCrudComponent} from '../role/role-internal-crud/role-internal-crud.component';

export class ComponentName {

  getComponetByName(name: string): Type<MzBaseModal> {
    switch (name) {
      case 'user':
        return UserInternalCrudComponent;
        break;
      case  'role':
        return RoleInternalCrudComponent;
    }
  }
}
