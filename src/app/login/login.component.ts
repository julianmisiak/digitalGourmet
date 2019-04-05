import {Component, OnInit} from '@angular/core';
import {AutenticationService} from '../services/autentication.service';
import {Router} from '@angular/router';
import {log} from 'util';
import {AuthService} from '../../utils/auth.service';
import {LocalStorageService} from '../../utils/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = null;
  password: string = null;

  constructor(private auteticationService: AutenticationService, private router: Router, private authService: AuthService,
              private localStorageService: LocalStorageService) {
  }

  login() {
    console.log('this.localStorageService.getItemData(LocalStorageService.TOKEN): ' + this.localStorageService.getItemData(LocalStorageService.TOKEN));
    if (this.localStorageService.getItemData(LocalStorageService.TOKEN)) {
      console.log('está logueado');
    } else {
      this.authService.login().subscribe(
        () => {
          console.log('está logueado');
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

  ngOnInit() {
  }

}
