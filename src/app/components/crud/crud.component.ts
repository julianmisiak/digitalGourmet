import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MzToastService} from 'ngx-materialize';
import {PersistentObjectLogicalDelete} from '../../model/PersistentObjectLogicalDelete';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  @Input() selectedRow: number;
  viewInactive: boolean;
  @Input() persistentObject: PersistentObjectLogicalDelete;
  @Output() newEmitter = new EventEmitter();
  @Output() updateEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();
  @Output() viewActiveEmitter = new EventEmitter();

  constructor(public authService: AuthService, public toastService: MzToastService) {
    this.selectedRow = null;
    this.viewInactive = false;
  }

  ngOnInit() {
  }

  public openServiceModal() {
    this.selectedRow = null;
  }

  public new() {
    this.newEmitter.emit();
  }

  public update() {
    this.updateEmitter.emit();
  }

  public delete() {
    this.deleteEmitter.emit();
  }

  public viewElementActive(viewInactive) {
    this.viewActiveEmitter.emit(viewInactive);
  }

  public handlerError(error) {
    if (error.status === 403) {
      this.authService.closeSession();
    }
    this.toastService.show(error.error.description, 4000);

  }

  public setClickedRow(persistentObject: PersistentObjectLogicalDelete) {
    if (this.selectedRow !== persistentObject.oid) {
      this.selectedRow = persistentObject.oid;
    } else {
      this.selectedRow = null;
    }
  }
}
