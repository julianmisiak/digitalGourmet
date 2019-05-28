import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MzToastService} from 'ngx-materialize';
import {User} from '../../../model/User';
import {UserGeneraldataTabComponent} from './user-generaldata-tab/user-generaldata-tab.component';
import {InternalCrudComponent} from '../../crud/internal-crud/internal-crud.component';
import {CrudService} from '../../../services/crud.service';

@Component({
  selector: 'app-user-internal-crud',
  templateUrl: './user-internal-crud.component.html',
  styleUrls: ['./user-internal-crud.component.scss']
})
export class UserInternalCrudComponent extends InternalCrudComponent implements OnInit {
  @Input() valueObject: User;
  @ViewChild(UserGeneraldataTabComponent) generalDataTab: UserGeneraldataTabComponent;

  constructor(private service: CrudService, public toastService: MzToastService) {
    super();
  }

  public save() {
    this.service.save(this.valueObject).subscribe(() => {
      this.toastService.show('Datos guardados correctamente', 4000);
    }, (error) => {
      alert('Hubo un error: ' + error.error.description);
    });
  }

  public saveAndActive() {
    this.valueObject.isActive = true;
    this.save();
  }

  ngOnInit() {
    // @todo Investigar como quitarlo. Se hizo en el caso en que sea nuevo

    if (this.valueObject === null) {
      this.valueObject = new User();
    }
  }

}
