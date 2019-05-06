import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MzBaseModal, MzModalComponent, MzModalService} from 'ngx-materialize';
import {FormGroup} from "@angular/forms";
import {PersistentObjectLogicalDelete} from "../../../model/PersistentObjectLogicalDelete";

@Component({
  selector: 'app-internal-crud',
  templateUrl: './internal-crud.component.html',
  styleUrls: ['./internal-crud.component.scss']
})
export class InternalCrudComponent extends MzBaseModal implements OnInit {
  public modalOptions: Materialize.ModalOptions = {
    dismissible: false,
    opacity: .7,
    inDuration: 500,
    outDuration: 300,
    startingTop: '10%',
    ready: (modal, trigger) => {
      console.log(modal, trigger);
    },
  };
  @Input() form: FormGroup;
  @Input() persistentObject: PersistentObjectLogicalDelete;
  @Output() saveEmitter = new EventEmitter();
  @ViewChild('modal') modal: MzModalComponent;

  constructor() {
    super();
  }

  public save() {
    this.saveEmitter.emit();
  }

  public saveAndActive() {
    this.persistentObject.isActive = true;
    this.save();
  }

  ngOnInit() {
  }

}
