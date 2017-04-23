import {AfterViewInit, Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'options',
    templateUrl: './options.component.html'
})
export class OptionsComponent implements AfterViewInit {
    @Input() oldPassword: string;
    @Input() newPassword: string;
    @Input() repeatPassword: string;


    constructor(private router: Router) {
    }

    formSubmit(event: Event) {
        event.preventDefault();
        this.router.navigate(['/options']);
        console.log('Änderung Speichern clicked');
        console.log(this.oldPassword +" "+this.newPassword+" "+this.repeatPassword);
    }

    checkOptionsForm() {
        var oldPassword = document.getElementById("old-password-input");

       console.log(oldPassword.innerHTML + " - "+this.newPassword +" "+ this.repeatPassword);
        var button = document.getElementById("save-changes-button");
        if (this.oldPassword == "" || this.oldPassword == undefined ||
            this.newPassword == "" || this.newPassword == undefined ||
            this.repeatPassword == "" || this.repeatPassword == undefined) {

            if (this.newPassword != this.repeatPassword) {
                document.getElementById("save-changes-button").setAttribute("disabled","true");
                console.log(document.getElementById("save-changes-button"));
            }

        } else {
            if (this.newPassword != this.repeatPassword) {
                document.getElementById("save-changes-button").setAttribute("disabled","true");
                console.log(document.getElementById("save-changes-button"));

            }
            else {
                document.getElementById("save-changes-button").setAttribute("disabled","false");
                console.log(document.getElementById("save-changes-button"));
            }
        }
    }

        ngAfterViewInit()
        {
            console.log(document);
            document.getElementById("new-password-input").addEventListener("keyup", this.checkOptionsForm);
            document.getElementById("repeat-password-input").addEventListener("keyup", this.checkOptionsForm);
            document.getElementById("old-password-input").addEventListener("keyup", this.checkOptionsForm);
        }


    }