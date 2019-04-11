import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, TokenWrapper} from '../../services/auth.service';
import {LocalStorageService} from '../../../utils/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;

  constructor(private router: Router, private authService: AuthService,
              private localStorageService: LocalStorageService) {
  }

  public login() {
    if (this.localStorageService.getItemData(LocalStorageService.TOKEN)) {
      this.router.navigate(['home']);
    } else {
      this.authService.login(this.userName, this.password).subscribe(
        (response: TokenWrapper) => {
          console.log('response.token: ' + response.token);
          this.localStorageService.saveDataInStorage(LocalStorageService.TOKEN, response.token);
          this.router.navigateByUrl('/home');
        },
        (error) => {
          alert(error.status);
          console.log(JSON.stringify(error));
        }
      );
    }
  }

  ngOnInit() {
  }

}