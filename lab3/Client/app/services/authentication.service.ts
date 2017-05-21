import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    constructor(private http: Http, private router: Router) { }

    login(credentials: any): Observable<boolean> {
        return this.http.post('http://localhost:8081/login', credentials).map((response: Response) => {
            // login successful
            let token = response.json();
            if (token) {
                localStorage.setItem('token', token);
                return true;
            } else {
                //failed login
                return false;
            }
        });
    }
    logout(): void {
        let authHeader = new Headers();
        authHeader.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        this.http.post('http://localhost:8081/logout', {}, { headers: authHeader }).forEach(resp => {
            try {
                localStorage.removeItem("token");
                console.log("logged out " + resp.json());
            } catch (e) {
                console.log(e);
            } finally {
                this.router.navigate(["/login"]);
            }
        });


    }
}