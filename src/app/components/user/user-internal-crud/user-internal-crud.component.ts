import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MzBaseModal, MzModalService, MzToastService} from 'ngx-materialize';
import {UserService} from '../../../services/user.service';
import {User} from '../../../model/User';
import {UserGeneraldataTabComponent} from './user-generaldata-tab/user-generaldata-tab.component';
import {UserAddressTabComponent} from './user-address-tab/user-address-tab.component';

@Component({
  selector: 'app-user-internal-crud',
  templateUrl: './user-internal-crud.component.html',
  styleUrls: ['./user-internal-crud.component.scss']
})
export class UserInternalCrudComponent extends MzBaseModal implements OnInit {
  @Input() user: User;
  @Output() updateGridCallBack = new EventEmitter();
  @ViewChild(UserGeneraldataTabComponent) generalDataTab: UserGeneraldataTabComponent;
  @ViewChild(UserAddressTabComponent) addressDataTab: UserAddressTabComponent;

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

  constructor(private modalService: MzModalService, private service: UserService, public toastService: MzToastService) {
    super();
  }

  public save() {
    console.log('usuarios: ' + JSON.stringify(this.user));
    this.service.save(this.user).subscribe(() => {
      this.toastService.show('Datos guardados correctamente', 4000);
    }, (error) => {
      alert('Hubo un error, detalle' + JSON.stringify(error));
    });
  }

  public saveAndActive() {
    this.user.isActive = true;
    this.save();
  }

  ngOnInit() {
  }

}
