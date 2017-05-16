import {Component, Directive, Input} from '@angular/core';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    moduleId: module.id, // to have the relative path
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent{
    @Input() username: string;
    @Input() password: string;

    constructor(private router: Router) {}

    submitForm(event: Event){
        event.preventDefault();

        console.log('Anmelden clicked + User: ' + this.username + ", PW: " + this.password);

        if(this.username == "" || this.username == undefined || this.password == "" || this.password == undefined) {
            this.router.navigate(['/login']);
            alert('Loginformular leer');
        } else {
            this.router.navigate(['/overview']);
        }
    }
}