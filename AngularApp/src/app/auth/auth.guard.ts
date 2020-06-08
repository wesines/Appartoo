import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from "@angular/router";
import { PagolinService } from '../shared/pagolin.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private pagolinService : PagolinService,private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log("AUTHGUARDthis.pagolinService.isLoggedIn()"+this.pagolinService.isLoggedIn());
      if (!this.pagolinService.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        this.pagolinService.deleteToken();
        return false;
      }
    return true;
  }
  }
  

