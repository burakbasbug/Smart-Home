import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
    moduleId: module.id,
    selector: 'my-login',
    templateUrl: '../views/login.html'
})
export class LoginComponent {

    loginError: boolean = false;

    constructor(private router: Router, private http: Http) { }

    onSubmit(form: NgForm): void {
        //TODO-Fertig Überprüfen Sie die Login-Daten über die REST-Schnittstelle und leiten Sie den Benutzer bei Erfolg auf die Overview-Seite weiter

        this.http.post('http://localhost:8081/login', form.value)
        .subscribe( (response) => {
            try{
                let resp = response.json();
                console.log("LOGGED IN!");
                localStorage.setItem("token", resp);
                this.router.navigate(['/overview']);
            }catch(e){
                console.log("Unable to route : " + e);
            }
        }, (err) => console.log("Unexpected error: " + err));
        
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