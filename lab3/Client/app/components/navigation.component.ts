import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {OptionsComponent} from "./options.component";
import {LoginComponent} from "./login.component";
import {Http,Headers} from "@angular/http";
import { AuthenticationService} from '../services/authentication.service'

@Component({
  moduleId: module.id,
  selector: 'my-navigation',
  templateUrl: '../views/navigation.component.html'
})
export class NavigationComponent {


  constructor(private router: Router, private route: ActivatedRoute, private authService:AuthenticationService) {};

  isOptionsShown(): boolean {
    return !this.isOptionsite() && !this.isLoginSite();
  }

  isLogoutShown(): boolean {
    return !this.isLoginSite();
  }


  isOptionsite(): boolean {
    return this.route.component === OptionsComponent;
  }


  isLoginSite(): boolean {
    return this.route.component === LoginComponent;
  }

  doLogout(): void {
    //TODO Loggen Sie den Benutzer über die REST-Schnittstelle aus
    this.authService.logout();
  }

}
