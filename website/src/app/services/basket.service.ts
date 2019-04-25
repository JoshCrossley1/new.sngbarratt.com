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

    constructor(private http: HttpClient, private basket: Basket, private userService: UserService, private authService: AuthService, private custValues: Customer) {
        this.customer = this.custValues.get();
    }

    NewAddToBasket = (product, qty, bskt, origin) => {

        let request = {
            webProductGuid: product.webProductGuid,
            quantity: qty,
            siteCode: 'UK', //(product.siteCode ? product.siteCode : product.branchProduct.siteCode),
            origin: origin ? origin : 'Not Set'
        }

        return this.http.post(
            `${environment.apiUrl}customers/` + this.customer.value.id + `/carts/item`, request
        )

        //check if access_token exists and it is not expired
        if (this.userService.getLocalStorage('access_token') && this.authService.isTokenExpired(this.userService.getLocalStorage('access_token'))) {

            //post to api
        } else {
            //add to existing basket in localStorage
            //return false

        }


    }
    
    addToBasket = (item) => {
        let jsonBskt = window.localStorage.getItem('basket');
        if (jsonBskt) {
            let bskt = JSON.parse(jsonBskt);
            let duplicate = false;

            bskt.items.forEach((bsktItem) => {
                if (bsktItem.guid == item.guid) {
                    bsktItem.qty++;
                    duplicate = true;
                }                
            })
            if (duplicate == false) {
                bskt.items.push(item);
            }            
            this.updateBasket(bskt);
        } else {
            this.createBasket(item);
        }
    }

    updateBasket = (basket) => {
        let jsonBskt = JSON.stringify(basket);
        window.localStorage.setItem('basket', jsonBskt)
        this.basket.update(basket);
    }

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
    }


}
