import {Component, OnInit} from "@angular/core";
import {Http,Headers} from '@angular/http';


@Component({
  moduleId: module.id,
  selector: 'my-sidebar',
  templateUrl: '../views/sidebar.component.html'
})
export class SidebarComponent implements OnInit{

  failed_logins: number = 0;
  server_start: Date = new Date();

  constructor(private http:Http){}

  ngOnInit(): void {
    //TODO Lesen Sie über die REST-Schnittstelle den Status des Servers aus und speichern Sie diesen in obigen Variablen
    let authHeader = new Headers();
    authHeader.append('authorization', `Bearer ${localStorage.getItem('token')}`);
    this.http.get('http://localhost:8081/getServerStatus',{ headers:authHeader }).subscribe( (response) => {
      this.failed_logins = response.json().attempts;
      this.server_start = new Date(response.json().server_start);
    });
  }
}
