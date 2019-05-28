import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MzModalService, MzToastService} from 'ngx-materialize';
import {PersistentObjectLogicalDelete} from '../../model/PersistentObjectLogicalDelete';
import {CrudService} from '../../services/crud.service';
import {ComponentName} from './ComponentName';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  @Input() title: string;
  @Input() displayedColumns: string;
  @Input() displayedRows: string;
  @Input() serviceName: string;

  rows: PersistentObjectLogicalDelete[];
  filterInput = '';
  viewInactive: boolean;
  selectedRow: any = null;
  componentName: ComponentName;

  constructor(public authService: AuthService, public toastService: MzToastService,
              public service: CrudService, public modalService: MzModalService) {
    this.componentName = new ComponentName();
  }

  ngOnInit() {
    this.service.setNameService(this.serviceName);
    this.getListElement();
  }

  public getListElement() {
    this.service.getList(!this.viewInactive).subscribe((data: any[]) => {
      this.rows = data;
    }, (error: any) => {
      console.log(JSON.stringify(error));
      this.handlerError(error);
    });
  }

  public openServiceModal() {
    // @todo this.componentName.getComponetByName(this.serviceName) quitarlo, investigar como hacerlo

    this.modalService.open(this.componentName.getComponetByName(this.serviceName),
      {valueObject: this.selectedRow}).onDestroy(() => {
      this.getListElement();
    });
  }

  public new() {
    this.selectedRow = null;
    this.openServiceModal();
  }

  public update() {
    this.openServiceModal();
  }

  public delete() {
    this.service.delete(this.selectedRow.oid).subscribe(() => {
      this.getListElement();
      this.toastService.show('Elemento eliminado', 4000);
    }, (error: Response) => {
      this.handlerError(error);
    });
  }

  public viewElementActive(viewInactive) {
    this.viewInactive = viewInactive;
    this.getListElement();
  }

  public handlerError(error) {
    if (error.status === 403) {
      this.authService.closeSession();
    }
    this.toastService.show(error.error.description, 4000);
  }

  public setClickedRow(persistentObject: PersistentObjectLogicalDelete) {
    if (this.selectedRow === null || this.selectedRow.oid !== persistentObject.oid) {
      this.selectedRow = persistentObject;
    } else {
      this.selectedRow = null;
    }
  }
}
