import {Component, OnInit} from '@angular/core';
import {AutenticationService} from '../services/autentication.service';
import {Router} from '@angular/router';
import {log} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = null;
  password: string = null;

  constructor(private auteticationService: AutenticationService, private router: Router) { }

  login() {
    this.auteticationService.loginWithEmail(this.email, this.password).subscribe((data) => {
      console.log(data);
    }, (error) => {
      log(error);
    });
  }

  ngOnInit() {
  }

}
