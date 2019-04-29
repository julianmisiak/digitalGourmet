import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MzBaseModal, MzModalService} from 'ngx-materialize';
import {UserService} from '../../../services/user.service';
import {User} from '../../../model/User';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-internal-crud',
  templateUrl: './user-internal-crud.component.html',
  styleUrls: ['./user-internal-crud.component.scss']
})
export class UserInternalCrudComponent extends MzBaseModal implements OnInit {
  @Input() user: User;
  @Output() updateGridCallBack = new EventEmitter();
  form: FormGroup;

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false,
    opacity: .7,
    inDuration: 500,
    outDuration: 300,
    startingTop: '100%',
    ready: (modal, trigger) => {
      console.log(modal, trigger);
    },
  };

  constructor(private modalService: MzModalService, private service: UserService) {
    super();
  }

  public save() {
    console.log('usuarios: ' + JSON.stringify(this.user));
    this.service.save(this.user).subscribe(() => {
      this.updateGridCallBack.emit();
    }, (error) => {
      alert('Hubo un error, detalle' + error);
    });
  }

  public saveAndActive() {
    this.user.isActive = true;
    this.save();
  }

  ngOnInit() {
  }

}
