import {Component, Input, OnInit} from '@angular/core';
import {Role} from '../../../model/Role';
import {InternalCrudComponent} from '../../crud/internal-crud/internal-crud.component';
import {MzToastService} from 'ngx-materialize';
import {RoleService} from '../../../services/role.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-role-internal-crud',
  templateUrl: './role-internal-crud.component.html',
  styleUrls: ['./role-internal-crud.component.scss']
})

export class RoleInternalCrudComponent extends InternalCrudComponent implements OnInit {
  @Input() role: Role;
  form: FormGroup;

  errorMessages = {
    name: {
      required: 'Campo obligatorio'
    },
    description: {}
  };

  constructor(private service: RoleService, public toastService: MzToastService, private formBuilder: FormBuilder) {
    super();
  }

  public save() {
    console.log('this.role: ' + JSON.stringify(this.role));
    this.service.save(this.role).subscribe(() => {
      this.toastService.show('Datos guardados correctamente', 4000);
    }, (error) => {
      alert('Hubo un error: ' + error.error.description);
    });
  }

  public saveAndActive() {
    this.role.isActive = true;
    this.save();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', this.errorMessages.name],
      description: ['', this.errorMessages.description]
    });
  }

}
