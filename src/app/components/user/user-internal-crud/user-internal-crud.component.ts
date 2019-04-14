import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MzBaseModal, MzModalService} from 'ngx-materialize';
import {UserService} from '../../../services/user.service';
import {User} from '../../../model/User';

@Component({
  selector: 'app-user-internal-crud',
  templateUrl: './user-internal-crud.component.html',
  styleUrls: ['./user-internal-crud.component.css']
})
export class UserInternalCrudComponent extends MzBaseModal implements OnInit {
  @Input() user: User;
  @Output() updateGridCallBack = new EventEmitter();

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false,
    opacity: .7,
    inDuration: 600,
    outDuration: 300,
    startingTop: '100%',
    endingTop: '10%',
    ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
   //   alert('Ready');
      console.log(modal, trigger);
    },
 //   complete: () => alert('Closed'), // Callback for Modal close

  };

  constructor(private modalService: MzModalService, private service: UserService) {
    super();
  }

  public save() {
    this.service.save(this.user).subscribe(() => {
      this.updateGridCallBack.emit();
    }, (error) => {
      alert('Hubo un error, detalle' + error);
    });
  }


  ngOnInit() {
  }

  public saveAndActive() {
    this.user.isActive = true;
    this.save();
  }
}
