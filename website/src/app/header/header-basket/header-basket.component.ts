import { Component, OnInit } from '@angular/core';
import { Basket } from '../../classes/basket';

@Component({
  selector: 'header-basket',
  templateUrl: './header-basket.component.html',
  styleUrls: ['./header-basket.component.css']
})
export class HeaderBasketComponent implements OnInit {

    basket: any;

    constructor(private basketClass: Basket) {
        this.basketClass.get()
            .subscribe((r: any) => {    
                this.basket = r;
            })
    }

  ngOnInit() {
  }

}
