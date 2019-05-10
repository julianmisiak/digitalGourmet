import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MzToastService} from 'ngx-materialize';
import {UserService} from '../../../services/user.service';
import {User} from '../../../model/User';
import {UserGeneraldataTabComponent} from './user-generaldata-tab/user-generaldata-tab.component';
import {InternalCrudComponent} from '../../crud/internal-crud/internal-crud.component';

@Component({
  selector: 'app-user-internal-crud',
  templateUrl: './user-internal-crud.component.html',
  styleUrls: ['./user-internal-crud.component.scss']
})
export class UserInternalCrudComponent extends InternalCrudComponent implements OnInit {
  @Input() user: User;
  @ViewChild(UserGeneraldataTabComponent) generalDataTab: UserGeneraldataTabComponent;

  constructor(private service: UserService, public toastService: MzToastService) {
    super();
  }

  public save() {
    this.service.save(this.user).subscribe(() => {
      this.toastService.show('Datos guardados correctamente', 4000);
    }, (error) => {
      alert('Hubo un error: ' + error.error.description);
    });
  }

  public saveAndActive() {
    this.user.isActive = true;
    this.save();
  }

  ngOnInit() {
  }

}
