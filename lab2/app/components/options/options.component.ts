import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'options',
    templateUrl: './options.component.html'
})
export class OptionsComponent{
    
    constructor(private router: Router){}

    formSubmit(event: Event){
        event.preventDefault();
        this.router.navigate(['/options']);
        console.log('Änderung Speichern clicked');
    }
}