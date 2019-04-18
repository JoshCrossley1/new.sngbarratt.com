import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {

    branch: string = 'UK';    
    token: any;

    closeResult: any;

    constructor(private auth: AuthService, private userService: UserService) { }    

    /*
    requestProduct = () => {        
        this.auth.getProduct()
            .subscribe(r => {
                console.log(r)
            }, error => {
                console.log(error)
            })
    }
    */

    /*
    open() {
        this.loginModal = this.modalService.open(ModalLoginComponent);
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    */

}
