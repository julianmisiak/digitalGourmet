import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticationGuardService implements CanActivate {

  constructor(private autenticationService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('this.autenticationService.getStatus: ' + this.autenticationService.getStatus());
    if (this.autenticationService.getStatus()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
