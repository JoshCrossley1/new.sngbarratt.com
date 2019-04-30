import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Basket } from '../classes/basket';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Customer } from '../classes/customer';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

    customer: any;

    constructor(private _http: HttpClient, private basket: Basket, private userService: UserService, private authService: AuthService, private custValues: Customer) {
        this.custValues.get()
            .subscribe((cust: any) => {
                this.customer = cust;
            })        
    }

    getBasket = () => {                        
        return this._http.get(
            `${environment.apiUrl}customers/` + this.customer.customerGuid + `/carts`)        
    }

    mergeBasket = (guid, cart) => {

        let formattedItems: any = [];

        cart.items.forEach((item) => {
            let formattedItem = {
                webProductGuid: item.webProductGuid,
                title: item.title,
                longTitle: item.longTitle ? item.longTitle : item.title,
                quantity: item.quantity,
                siteCode: 'UK', //todo - BRANCH
                origin: item.origin ? item.origin : 'Not Set'
            }
            formattedItems.push(formattedItem)
        })

        let req = {
            site: 'UK', //todo - BRANCH
            items: formattedItems
        }

        return this._http.post(
            `${environment.apiUrl}customers/` + this.customer.customerGuid + `/carts/merge`, 
            req
        )

    }

    getBasketByGuid = (guid) => {
        return this._http.get(
            `${environment.apiUrl}customers/` + guid + `/carts`)
    }

    getLocalBskt = () => {
        if (this.userService.getLocalStorage('basket')) {
            return this.userService.getLocalStorage('basket')
        } else {
            this.createBasket()
        }
    }

    createBasket = () => {
        return this.userService.setLocalStorage('basket', {});
    }




    NewAddToBasket = (product, qty, bskt, origin) => {

        let request = {
            webProductGuid: product.webProductGuid,
            quantity: qty,
            siteCode: 'UK', //(product.siteCode ? product.siteCode : product.branchProduct.siteCode),
            origin: origin ? origin : 'Not Set'
        }

        return this._http.post(
            `${environment.apiUrl}customers/` + this.customer.value.id + `/carts/item`, request
        )

        //check if access_token exists and it is not expired
        if (this.userService.getLocalStorage('access_token') && !this.authService.isTokenExpired(this.userService.getLocalStorage('access_token'))) {

            //post to api
        } else {
            //add to existing basket in localStorage
            //return false

        }        
    }
    
    /*
    createBasket = (item) => {
        let newBasket = {
            items: <any>[]
        }
        if (item) {
            newBasket.items.push(item)
        }
        let jsBasket = JSON.stringify(newBasket);
        window.localStorage.setItem('basket', jsBasket);
        this.basket.update(jsBasket)
    }*/


}
