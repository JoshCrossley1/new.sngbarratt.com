import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { Customer } from '../classes/customer';

import { CustomerService } from '../services/customer.service';

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

    loggedIn: any;

    customer: any;

    constructor(private auth: AuthService, private userService: UserService, private customerService: CustomerService, private customerClass: Customer) {
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
                    console.log('LOGIN!!')
                    console.log(this.loginData)
                    let decodedToken = this.auth.decodeToken(this.loginData.access_token);
                    console.log(decodedToken)
                    this.userService.setLocalStorage('access_token', this.loginData.access_token);
                    this.userService.setLocalStorage('refreshToken', this.loginData.refresh_token);
                    this.userService.setLocalStorage('custGuid', decodedToken.custGuid);
                    this.loadCustomerByLocalStorage();
                }, error => {
                    console.log(error)
                })
        }
    }

    loadRefreshToken = () => {
        let rt = this.auth.getRefreshToken();                
        this.auth.refreshToken(rt, '2FC6E2AC-18D6-462E-A662-FF6BC75968C9')
            .subscribe((r: any) => {                
                console.log(r)
                this.userService.setLocalStorage('refreshToken', r.refresh_token);
                this.userService.setLocalStorage('access_token', r.access_token);
            }, error => {
                console.log(error)
                let t = this.auth.getAuthToken()
                console.log(this.auth.isTokenExpired(t));
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
        let guid = this.auth.getLocalStorage('custGuid');
        this.loadCustomer(guid)
    }

    loadProductData() {
        this.auth.loadProductData()
            .subscribe(r => {
                console.log(r)
            })
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
                this.userService.setLocalStorage('custGuid', decodedToken.custGuid);
                this.loggedIn = true;
                
                this.loadCustomerByLocalStorage();                
            }, error => {
                console.log(error)
            })
    }

    ngOnInit() {
    }    
}
