import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'generic-search',
  templateUrl: './generic-search.component.html',
  styleUrls: ['./generic-search.component.css']
})
export class GenericSearchComponent implements OnInit {

    @Input() placeholder: string;
    @Input() columns: string;
    @Input() inputType: string;

    //can be extended further in future for more generic customisation

  constructor() { }


  ngOnInit() {
  }

}
