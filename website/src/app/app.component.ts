import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import { Customer } from './classes/customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {

    branch: string = 'UK';    
    token: any;
    customer: any;    

    closeResult: any;

    constructor(private auth: AuthService, private userService: UserService, private customerClass: Customer) {
        this.preRenderCust()
    }    

    preRenderCust() {
        let x = {
            id: '3e8e7086-d66f-4a09-ba44-73c92b86d334',
            name: 'Josh C'            
        }
        this.customerClass.update(x);
    }

    loadCust() {
        this.customer = this.customerClass.get();
    }


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
