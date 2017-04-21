import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
    moduleId: module.id, // to have the relative path
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent{
    constructor(private router: Router) {}

    submitForm(event: Event){
        event.preventDefault();
        this.router.navigate(['/overview']);
        console.log('Anmelden clicked');
    }
}