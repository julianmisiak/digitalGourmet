import {Component, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/User';
import 'materialize-css';
// @ts-ignore
import {AuthService} from '../../services/auth.service';
import {MzModalService, MzToastService} from 'ngx-materialize';
import {UserInternalCrudComponent} from './user-internal-crud/user-internal-crud.component';
import {CrudComponent} from '../crud/crud.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent extends CrudComponent implements OnInit {
  userList: User[];
  user: User;
  displayedColumns = ['Nombre de Usuario', 'Creado por el Usuario', 'Modificado por el Usuario'];
  selectedRow: number = null;
  isChecked: boolean;

  constructor(public authService: AuthService, public toastService: MzToastService,
              public service: UserService, public modalService: MzModalService) {
    super(authService, toastService, modalService);
    this.user = new User();
    this.isChecked = false;
  }


  ngOnInit() {
    this.getListElement(true);
  }

  public getListElement(isActive) {
    this.service.getUserList(isActive).subscribe((data: User[]) => {
      console.log(JSON.stringify(data));
      this.userList = data;
    }, (error: Response) => {
      this.handlerError(error);
    });
  }

  private handlerError(error: Response) {
    console.log('error.status: ' + error.status);
    if (error.status === 403) {
      this.authService.closeSession();
    }
  }

  public setClickedRow(user: User) {
    if (this.selectedRow !== user.oid) {
      this.selectedRow = user.oid;
      this.user = user;
    } else {
      this.selectedRow = null;
      this.user = new User();
    }
  }

  openServiceModal() {
    this.modalService.open(UserInternalCrudComponent, {user: this.user}).onDestroy(() => {
      this.getListElement(true);
    });
  }

  public new() {
    this.user = new User();
    this.openServiceModal();
  }

  public update() {
    this.openServiceModal();
  }

  public delete() {
    super.delete();
  }

  public viewElementActive() {
    this.getListElement(!this.isChecked);
  }
}
