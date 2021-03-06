import { Component, OnInit } from '@angular/core';
import { Basket } from '../classes/basket'; 

import { ProductsService } from '../services/products.service';
import { BasketService } from '../services/basket.service';
import { Customer } from '../classes/customer';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

    products: any;
    basket: any;
    cust: any;

    constructor(private productsService: ProductsService, private basketService: BasketService, private basketClass: Basket, private customerClass: Customer) {

        this.customerClass.get()
            .subscribe((cust: any) => {
                this.cust = cust;
            })

        this.basketClass.get()
            .subscribe((bskt: any) => {
                this.basket = bskt;
            })
        

        this.productsService.getProducts()
            .subscribe((r: any) => {
                this.products = r.results;
            })
    }

    ngOnInit() {        

    }

    addToBasket(product) {
        console.log('ADD TO BASKET')
        console.log(product)
        this.basketService.NewAddToBasket(product, 1, 'basket', 'Not Set')
            .subscribe(r => {
                console.log('LOG RESPONSE')
                console.log(r)
            })
    }

    shippingPromotions: any = [{
        desc: "Spend 90.00 (108 inc VAT) more and your order will qualify for FREE Standard Domestic Shipping"
    }]

}
