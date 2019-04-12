import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MzModalService, MzToastService} from "ngx-materialize";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

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
}
