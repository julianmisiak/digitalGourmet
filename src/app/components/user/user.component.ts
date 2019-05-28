import {Component} from '@angular/core';
import 'materialize-css';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent {
  title = 'Listado de usuarios';
  displayedColumns = ['Usuario', 'Nombre', 'Apellido', 'Email'];
  displayedRows = ['userName', 'name', 'surname', 'email'];
  serviceName = 'user';

  constructor() {
  }

}
