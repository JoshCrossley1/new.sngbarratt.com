import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { Customer } from '../classes/customer';
import { Basket } from '../classes/basket';

import { CustomerService } from '../services/customer.service';
import { BasketService } from '../services/basket.service';

import { FormGroup, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalLoginComponent } from '../modal-login/modal-login.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loginModal: NgbModalRef; 

    loginData: any;
    decodedToken: any;
    
    customer: any;

    constructor(private auth: AuthService, private userService: UserService, private customerService: CustomerService, private customerClass: Customer, private basketService: BasketService, private basketClass: Basket) {
        this.loginForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        })
    }    

    submit(form) {
        if (form.valid) {
            let formValue = {
                username: form.controls.username.value,
                password: form.controls.password.value
            }
            let req = 'grant_type=password&username=' + formValue.username + '&password=' + formValue.password + '&client_id=2FC6E2AC-18D6-462E-A662-FF6BC75968C9';
            this.auth.login(req)
                .subscribe(response => {                    
                    this.loginData = response;    
                    let decodedToken = this.auth.decodeToken(this.loginData.access_token);
                    
                    this.userService.setLocalStorage('access_token', this.loginData.access_token);
                    this.userService.setLocalStorage('refreshToken', this.loginData.refresh_token);
                    this.customerService.getCustomerByGuid(decodedToken.custGuid)
                        .subscribe((customer: any) => {
                            this.customerClass.update(customer)
                            this.loadCustomerBasket()
                        })                    
                }, error => {
                    console.log(error)
                })
        }
    }

    loadRefreshToken = () => {        
        let rt = this.auth.getRefreshToken();                        
        this.auth.refreshToken(rt, '2FC6E2AC-18D6-462E-A662-FF6BC75968C9')
            .subscribe((r: any) => {                                
                this.userService.setLocalStorage('refreshToken', r.refresh_token);
                this.userService.setLocalStorage('access_token', r.access_token);
            }, error => {                
                let t = this.auth.getAuthToken()                
                //clear local storage
                this.userService.clearLocalStorage('access_token');
                this.userService.clearLocalStorage('refreshToken');
            })
    }

    loadCustomer(guid) {
        this.customerService.getCustomerByGuid(guid)
            .subscribe(r => {
                this.customer = r;
                this.customerClass.update(r);
            })
    }

    loadCustomerByLocalStorage() {
        let guid = this.userService.getLocalStorage('custGuid');
        this.loadCustomer(guid)
    }

    loadCustomerBasket() {
        this.basketService.getBasket()
            .subscribe(r => {
                this.basketClass.update(r)
            })
    }

    basketMerge() {
        //this.basketService.mergeBasket()
    }

    login() {
        let req = 'grant_type=password&username=josh.crossley@sngbarratt.com' + '&password=Crossley123' + '&client_id=2FC6E2AC-18D6-462E-A662-FF6BC75968C9';
        this.auth.login(req)
            .subscribe(response => {
                this.loginData = response;                
                let decodedToken = this.auth.decodeToken(this.loginData.access_token);
                console.log(decodedToken)
                this.userService.setLocalStorage('access_token', this.loginData.access_token);
                this.userService.setLocalStorage('refreshToken', this.loginData.refresh_token);
                this.customerService.getCustomerByGuid(decodedToken.custGuid)
                    .subscribe((customer: any) => {
                        this.customerClass.update(customer)
                        this.loadCustomerBasket()
                    })                                  
            }, error => {
                console.log(error)
            })
    }

    logout() {
        this.auth.logout()
    }

    ngOnInit() {
    }    
}
