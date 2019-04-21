import {Component, HostBinding} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Digital Gourmet';
  public theme: string;
  @HostBinding('class') componentCssClass;

  constructor(public router: Router) {
    this.theme = 'dark-theme';
  }

}
