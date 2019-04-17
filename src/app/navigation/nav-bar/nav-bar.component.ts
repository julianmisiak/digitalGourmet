import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  public closeSesion() {
    this.authService.closeSession();

  }
}
