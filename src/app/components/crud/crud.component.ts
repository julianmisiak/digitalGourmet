import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MzModalService, MzToastService} from 'ngx-materialize';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  selectedRow: number = null;
  viewInactive: false;
  @Output() emitEvent: EventEmitter<any> = new EventEmitter<any>();

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

  public viewElementActive() {
  }
}
