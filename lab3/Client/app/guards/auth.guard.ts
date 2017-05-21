import { Injectable } from '@angular/core';
import { Router, CanActivate,CanDeactivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {
        if (localStorage.getItem('token')) {
            // logged in so return true
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}