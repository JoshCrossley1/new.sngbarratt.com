import { Component, OnInit } from '@angular/core';

import { Customer } from '../classes/customer';
import { Basket } from '../classes/basket';

//temp import
import { CustomerService } from '../services/customer.service';
import { ProductsService } from '../services/products.service';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    customer: any;
    basket: any;

    searchForm: FormGroup;

    constructor(private customerClass: Customer, private basketClass: Basket, private customerService: CustomerService, private productsService: ProductsService) {

        this.customerClass.get()
            .subscribe((cust: any) => {
                this.customer = cust;
            })

        this.basketClass.get()
            .subscribe((bskt: any) => {
                this.basket = bskt;
            })

        this.searchForm = new FormGroup({
            searchInput: new FormControl()
        })        
    }

    getOrders = (custGuid) => {
        console.log(this.customer)
        this.customerService.getCustomersOrders(custGuid)
            .subscribe(r => {
                console.log('authed endpoint')
                console.log(r)
            })
    }

    clearBasket() {
        this.basketClass.update(null)
    }

    ngOnInit() {
    }

}
