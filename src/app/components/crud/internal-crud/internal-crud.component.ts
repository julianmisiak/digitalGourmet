import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MzBaseModal} from 'ngx-materialize';
import {FormGroup} from '@angular/forms';
import {PersistentObjectLogicalDelete} from '../../../model/PersistentObjectLogicalDelete';

@Component({
  selector: 'app-internal-crud',
  templateUrl: './internal-crud.component.html',
  styleUrls: ['./internal-crud.component.scss']
})
export class InternalCrudComponent extends MzBaseModal implements OnInit {
  public modalOptions: Materialize.ModalOptions = {
    dismissible: false,
    opacity: .7,
    inDuration: 400,
    outDuration: 300,
    startingTop: '10%',
    ready: (modal, trigger) => {
      console.log(modal, trigger);
    },
  };

  @Input() form: FormGroup;
  @Input() persistentObject: PersistentObjectLogicalDelete;
  @Output() saveEmitter = new EventEmitter();

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
