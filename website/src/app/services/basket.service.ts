import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Basket } from '../classes/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

    constructor(private http: HttpClient, private basket: Basket) { }

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
