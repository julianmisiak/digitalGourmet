import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  public closeFunctionCallback() {
    alert('sxs');
  }

  public closeSesion() {
    this.authService.closeSession();
  }
}
