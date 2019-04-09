import {Component, EventEmitter, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/User';
import 'materialize-css';
// @ts-ignore
import {MaterializeAction, MaterializeModule} from 'angular2-materialize';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userList: User[];
  user: User;

  constructor(private service: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    this.service.getUserList().subscribe((data: User[]) => {
      console.log(JSON.stringify(data));
      this.userList = data;
    }, (error) => {
      alert(error.status);
      console.log(JSON.stringify(error));
    });
  }


  alert() {
    alert('Alert');
  }

  public save() {
    this.service.save(this.user).subscribe((data: boolean) => {
      alert('Datos Guardados Correctamente');
    }, (error) => {
      alert('Hubo un error, detalle' + error);
    });
  }
}
