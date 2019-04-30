import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  title: string = 'SHARED TITLE!!!'

  constructor() { }

  ngOnInit() {
  }

}
