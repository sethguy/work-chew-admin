import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from '../firebase'
import { FireService } from './fire.service';
@Injectable()
export class AuthGuard implements CanActivate {

  // add the service we need
  constructor(
    private router: Router,
    private fireService: FireService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // handle any redirects if a user isn't authenticated
    console.log(next);
    console.log('this.fireService.isLoggedIn()', this.fireService.isLoggedIn());

    if (this.fireService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}