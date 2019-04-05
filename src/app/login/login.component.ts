import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {LocalStorageService} from '../../utils/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: string = null;
  password: string = null;

  constructor(private router: Router, private authService: AuthService,
              private localStorageService: LocalStorageService) {
  }

  public login() {
    if (this.localStorageService.getItemData(LocalStorageService.TOKEN)) {
      console.log('está logueado');
      this.localStorageService.removeStorage(LocalStorageService.TOKEN);
    } else {
      this.authService.login(this.user, this.password).subscribe(
        (data) => {
          console.log('está logueado');
        },
        (error: Response) => {
          alert(error.status);
          console.log(error);
        }
      );
    }
  }

  ngOnInit() {
  }

}
