import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../../model/User';
import {Gender} from '../../../../model/Gender';

@Component({
  selector: 'app-user-generaldata-tab',
  templateUrl: './user-generaldata-tab.component.html',
  styleUrls: ['./user-generaldata-tab.component.scss']
})

export class UserGeneraldataTabComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() valueObject: User;
  genders = Gender;
  keys = Object.keys;

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

  constructor(private formBuilder: FormBuilder) {
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
