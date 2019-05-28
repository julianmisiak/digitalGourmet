import {Component, Input, OnInit} from '@angular/core';
import {Role} from '../../../model/Role';
import {InternalCrudComponent} from '../../crud/internal-crud/internal-crud.component';
import {MzToastService} from 'ngx-materialize';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CrudService} from '../../../services/crud.service';

@Component({
  selector: 'app-role-internal-crud',
  templateUrl: './role-internal-crud.component.html',
  styleUrls: ['./role-internal-crud.component.scss']
})

export class RoleInternalCrudComponent extends InternalCrudComponent implements OnInit {
  @Input() valueObject: Role;
  form: FormGroup;

  errorMessages = {
    name: {
      required: 'Campo obligatorio'
    },
    description: {}
  };

  constructor(private service: CrudService, public toastService: MzToastService, private formBuilder: FormBuilder) {
    super();
  }

  public save() {
    console.log('this.role: ' + JSON.stringify(this.valueObject));
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
      this.valueObject = new Role();
    }

    this.form = this.formBuilder.group({
      name: ['', this.errorMessages.name],
      description: ['', this.errorMessages.description]
    });
  }

}
