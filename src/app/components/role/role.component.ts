import {Component, OnInit} from '@angular/core';
import {CrudComponent} from '../crud/crud.component';
import {AuthService} from '../../services/auth.service';
import {MzModalService, MzToastService} from 'ngx-materialize';
import {Role} from '../../model/Role';
import {RoleService} from '../../services/role.service';
import {RoleInternalCrudComponent} from './role-internal-crud/role-internal-crud.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent extends CrudComponent implements OnInit {
  role: Role;
  roleList: Role[];
  displayedColumns = ['Nombre', 'Descripción'];
  filterInput = '';

  constructor(public authService: AuthService, public toastService: MzToastService,
              public modalService: MzModalService, public service: RoleService) {

    super(authService, toastService);
    this.role = new Role();
  }

  ngOnInit() {
    this.getListElement();
  }

  public getListElement() {
    this.service.getRoleList(!this.viewInactive).subscribe((data: Role[]) => {
      this.roleList = data;
    }, (error: any) => {
      console.log(JSON.stringify(error));
      this.handlerError(error);
    });
  }

  public handlerError(error: Response) {
    super.handlerError(error);
  }

  public setClickedRow(role: Role) {
    super.setClickedRow(role);
    this.role = role;
  }

  public openServiceModal() {
    super.openServiceModal();
    this.modalService.open(RoleInternalCrudComponent, {role: this.role}).onDestroy(() => {
      this.getListElement();
    });
  }

  public new() {
    this.role = new Role();
    this.openServiceModal();
  }

  public update() {
    this.service.getRoleByID(this.selectedRow).subscribe((data) => {
      this.role = data;
      this.openServiceModal();
    });
  }

  public delete() {
    this.service.delete(this.selectedRow).subscribe(() => {
      this.toastService.show('Elemento eliminado', 4000);
      this.getListElement();
    }, (error: Response) => {
      this.handlerError(error);
    });
  }

  public viewElementActive(viewInactive: boolean) {
    this.viewInactive = viewInactive;
    this.getListElement();
  }

}
