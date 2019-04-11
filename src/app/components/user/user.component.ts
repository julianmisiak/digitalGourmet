import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/User';
import 'materialize-css';
// @ts-ignore
import {AuthService} from '../../services/auth.service';
import {MzModalService, MzToastService} from "ngx-materialize";
import {UserInternalCrudComponent} from "./user-internal-crud/user-internal-crud.component";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  userList: User[];
  user: User;
  displayedColumns = ['Nombre de Usuario', 'Creado por el Usuario', 'Modificado por el Usuario'];
  selectedRow: number = null;
  isDelete = true;

  constructor(private service: UserService, private authService: AuthService, private modalService: MzModalService,
              private toastService: MzToastService) {
    this.user = new User();
  }

  ngOnInit() {
    this.service.getUserList().subscribe((data: User[]) => {
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

  delete() {
    this.toastService.show(
      `<span>Cancelar Borrado</span>
                <button  class="btn-flat white-text medium" onclick="changueDelete()">Cancelar</button>`,
      4000, this.changueDelete(), () => {
        if (this.isDelete) {
          alert('Acá debería eliminar');
        } else {
          this.isDelete = true;
          alert('Acá no haría nada');
        }
      });
  }

  showCallbackToast() {
    this.toastService.show('I am a callback toast!', 4000, null, () => alert('Toast has been dismissed'));
  }

  openServiceModal() {
    this.modalService.open(UserInternalCrudComponent, {user: this.user});
  }

  new() {
    this.user = new User();
    this.openServiceModal();
  }

  update() {
    this.openServiceModal();
  }


  private changueDelete() {
    this.isDelete = false;
    return '';
  }
}
