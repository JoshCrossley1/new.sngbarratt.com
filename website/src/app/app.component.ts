import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CustomerService } from './services/customer.service';
import { BasketService } from './services/basket.service';

import { Customer } from './classes/customer';
import { Basket } from './classes/basket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {

    branch: string = 'UK';    
    token: any;
    customer: any;    
    basket: any;

    closeResult: any;

    constructor(
        private auth: AuthService,
        private userService: UserService,
        private customerService: CustomerService,
        private basketService: BasketService,
        private customerClass: Customer,
        private basketClass: Basket) {
    }  

    preRenderCust() {
        let token = this.userService.getLocalStorage('access_token')    
        //access token exists, decode and get the customer's details
        if (token) {
            let dToken = this.auth.decodeToken(token);             
            this.customerService.getCustomerByGuid(dToken.custGuid)
                .subscribe((r: any) => {                            
                    //update the global Customer variable
                    this.customerClass.update(r)   

                    //passing guid as the service doesn't recognise the Customer class when performing the GET as the app is 
                    //still loading in
                    this.loadBasket(r.customerGuid)
                })            
        } else {
            let guestCust = {
                customerGuid: 'guest'
            }
            this.customerClass.update(guestCust)
        }
    }

    loadBasket(g) {
        this.basketService.getBasket()        
        if (this.userService.getLocalStorage('access_token') && !this.auth.isTokenExpired(this.userService.getLocalStorage('access_token'))) {
            this.basketService.getBasketByGuid(g)
                .subscribe(r => {
                    this.basketClass.update(r);
                })
        } else {
            this.basketClass.update(this.basketService.getLocalBskt())
        }                    
    }

    loadCust() {
        this.customerClass.get()
            .subscribe((cust: any) => {
                this.customer = cust;
            })        
    }

    ngOnInit() {
        this.preRenderCust()
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
