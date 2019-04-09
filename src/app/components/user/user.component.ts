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
  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserList().subscribe((data: User[]) => {
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
}
