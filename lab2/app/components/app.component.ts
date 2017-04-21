import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `<body>
  <h1>{{name}}</h1>
  <nav>
    <a routerLink="/login">Login</a>
    <a routerLink="/details">Dsetails</a>
    <a routerLink="/options">Options</a>
    <a routerLink="/overview">Overview</a>
   </nav>
  <router-outlet></router-outlet>
  </body>`
})
export class AppComponent {
  name = "Navi (AppComponent)";
}
