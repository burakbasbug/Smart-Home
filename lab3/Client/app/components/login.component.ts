import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService} from '../services/authentication.service'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
    moduleId: module.id,
    selector: 'my-login',
    templateUrl: '../views/login.html'
})
export class LoginComponent {

    constructor(private router: Router, private authService:AuthenticationService) { }

    onSubmit(form: NgForm): void {
        //TODO-Fertig Überprüfen Sie die Login-Daten über die REST-Schnittstelle und leiten Sie den Benutzer bei Erfolg auf die Overview-Seite weiter

        this.authService.login(form.value).subscribe( (authSucceed) => {
            if(authSucceed===true){
                this.router.navigate(['/overview']);
                console.log('logged in');
            }else{
                console.log('Username or password is incorrect');
            }
        })
    }
}

/*



this.http.post('http://localhost:8081/login', form.value).forEach((r) => {

            try {
                let token = r.headers.getAll("token");
                console.log(token);
                //console.log("LOGGED IN! Token: " + token);
                //localStorage.setItem("token", token);
                this.router.navigate(['/overview']);
            } catch (e) {
                console.log("Unexpected header");
            }

        });


*/