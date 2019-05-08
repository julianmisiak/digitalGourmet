import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, TokenWrapper} from '../../services/auth.service';
import {LocalStorageService} from '../../../utils/local-storage.service';
import {MzToastService} from 'ngx-materialize';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;

  constructor(private router: Router, private authService: AuthService,
              private localStorageService: LocalStorageService, public toastService: MzToastService) {
  }

  public login() {
    if (this.localStorageService.getItemData(LocalStorageService.TOKEN)) {
      this.router.navigate(['home']);
    } else {
      this.authService.login(this.userName, this.password).subscribe(
        (response: TokenWrapper) => {
          this.localStorageService.saveDataInStorage(LocalStorageService.TOKEN, response.token);
          this.router.navigate(['home']);
        },
        (error) => {
          this.toastService.show(error.error.description, 4000);
          console.log(JSON.stringify(error));
        }
      );
    }
  }

  ngOnInit() {
  }

}
