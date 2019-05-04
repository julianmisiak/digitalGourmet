import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/User';
import 'materialize-css';
import {AuthService} from '../../services/auth.service';
import {MzModalService, MzToastService} from 'ngx-materialize';
import {UserInternalCrudComponent} from './user-internal-crud/user-internal-crud.component';
import {CrudComponent} from '../crud/crud.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent extends CrudComponent implements OnInit {
  userList: User[];
  user: User;
  displayedColumns = ['Usuario', 'Nombre', 'Apellido', 'Email'];
  filterInput = '';

  constructor(public authService: AuthService, public toastService: MzToastService,
              public service: UserService, public modalService: MzModalService) {
    super(authService, toastService);
    this.user = new User();
  }

  ngOnInit() {
    this.getListElement();
  }

  public getListElement() {
    this.service.getUserList(!this.viewInactive).subscribe((data: User[]) => {
      this.userList = data;
    }, (error: any) => {
      console.log(JSON.stringify(error));
      this.handlerError(error);
    });
  }

  public handlerError(error: Response) {
    super.handlerError(error);
  }

  public setClickedRow(user: User) {
    super.setClickedRow(user);
  }

  public openServiceModal() {
    this.modalService.open(UserInternalCrudComponent, {user: this.user}).onDestroy(() => {
      this.getListElement();
    });
  }

  public new() {
    this.user = new User();
    this.openServiceModal();
  }

  public update() {
    this.service.getUserByID(this.selectedRow).subscribe((data) => {
      this.user = data;
      this.openServiceModal();
    });
  }

  public delete() {
    this.service.delete(this.selectedRow).subscribe((data: boolean) => {
      this.getListElement();
    }, (error: Response) => {
      this.handlerError(error);
    });
  }

  public viewElementActive(viewInactive: boolean) {
    console.log('this.viewInactive: ' + this.viewInactive);
    this.viewInactive = viewInactive;
    this.getListElement();
  }
}
