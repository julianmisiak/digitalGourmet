import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MzModalService, MzToastService} from 'ngx-materialize';
import {PersistentObjectLogicalDelete} from '../../model/PersistentObjectLogicalDelete';
import {User} from '../../model/User';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  @Input() selectedRow: number = null;
  viewInactive: false;
  @Output() emitEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() persistentObjectLogicalDelete: PersistentObjectLogicalDelete;

  constructor(public authService: AuthService, public toastService: MzToastService, public modalService: MzModalService) {
  }

  ngOnInit() {
  }

  public openServiceModal() {
  }

  public new() {
    this.toastService.show('Datos guardados correctamente', 4000);
  }

  public update() {
    this.toastService.show('Datos Actualizados Correctamente', 4000);
  }

  public delete() {
    this.toastService.show('Elemento eliminado', 4000);
  }

  public handlerError(error: Response) {
    console.log('error.status: ' + error.status);
    if (error.status === 403) {
      this.authService.closeSession();
    }
  }

  public setClickedRow(persistentObject: PersistentObjectLogicalDelete) {
    if (this.selectedRow !== persistentObject.oid) {
      this.selectedRow =  persistentObject.oid;
    } else {
      this.selectedRow = null;
    }
  }
}
