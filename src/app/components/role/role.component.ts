import {Component} from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent {
  title = 'Listado de Roles';
  displayedColumns = ['Nombre', 'Descripción'];
  displayedRows = ['name', 'description'];
  serviceName = 'role';

  constructor() {
  }

}
