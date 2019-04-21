import {Component, EventEmitter, Input, OnInit, Output, Renderer, ViewChild} from '@angular/core';
import {MzBaseModal, MzModalService} from 'ngx-materialize';
import {UserService} from '../../../services/user.service';
import {User} from '../../../model/User';
import {Gender} from '../../../model/Gender';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-internal-crud',
  templateUrl: './user-internal-crud.component.html',
  styleUrls: ['./user-internal-crud.component.scss']
})
export class UserInternalCrudComponent extends MzBaseModal implements OnInit {
  @Input() user: User;
  @Output() updateGridCallBack = new EventEmitter();
  genders = Gender;
  keys = Object.keys;
  form: FormGroup;
  submitted = false;
  submittedValues: any;

  errorMessages = {
    name: {
      required: 'Campo obligatorio'
    },
    surname: {
      required: 'Campo obligatorio'
    },
    idCard: {
      required: 'Campo obligatorio',
      minlength: 'Debe estar cmpuesto por 8 números',
      maxlength: 'Debe estar cmpuesto por 8 números'
    },
    gender: {
      required: 'Campo obligatorio'
    },
    email: {
      required: 'Campo obligatorio',
      email: 'Formato de email incorrecto'
    },
    userName: {
      required: 'Campo obligatorio'
    },
    password: {
      required: 'Campo obligatorio'
    }
  };


  public modalOptions: Materialize.ModalOptions = {
    dismissible: false,
    opacity: .7,
    inDuration: 600,
    outDuration: 300,
    startingTop: '100%',
    endingTop: '10%',
    ready: (modal, trigger) => {
      console.log(modal, trigger);
    },
  };

  constructor(private modalService: MzModalService, private service: UserService, private formBuilder: FormBuilder) {
    super();
  }

  public save() {
    this.submitted = true;
    this.submittedValues = this.form.value;

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
    this.form = this.formBuilder.group({
      name: ['', this.errorMessages.name],
      surname: ['', this.errorMessages.surname],
      idCard: ['', this.errorMessages.idCard],
      gender: ['', this.errorMessages.gender],
      email: ['', this.errorMessages.email],
      userName: ['', this.errorMessages.userName],
      password: ['', this.errorMessages.password]
    });

  }
}
