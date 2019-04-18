import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
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

    customer: any;

    constructor(private auth: AuthService, private userService: UserService, private customerService: CustomerService) {
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
                    this.userService.setLocalStorage('jwToken', response);
                    this.decodedToken = this.auth.decodeToken(this.loginData.access_token);
                    this.userService.setLocalStorage('custGuid', this.decodedToken.custGuid);
                    this.loadCustomer(this.decodedToken.custGuid);
                })
        }
    }

    loadCustomer(token) {
        this.customerService.getCustomerByGuid(token)
            .subscribe(r => {
                this.customer = r;
            })
    }    

    loadCustomerByLocalStorage() {
        let guid = this.auth.getLocalStorage('custGuid');
        this.loadCustomer(guid)
    }

    ngOnInit() {
    }

  

}
