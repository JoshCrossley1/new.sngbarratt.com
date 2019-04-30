import { Component, OnInit, Input } from '@angular/core';
//import { EatClickIf } from '../directives/eat-click-if.directive'; 

@Component({
  selector: 'part-result',
  templateUrl: './part-result.component.html',
  styleUrls: ['./part-result.component.css']
})
export class PartResultComponent implements OnInit {

    @Input() context: string;
    @Input() product: any;
    @Input() result: any;
    partTypeClass: string = 'result';
    //type: string = 'grid';
    superseded: boolean = false;
    recommended: boolean = true;
    view: string = 'grid'
    partSuperseded: boolean = true;
    stubFb: any = {
        status: 'LDG',
        text: 'LDG'
    }
    fb: any = {    
        text: 'stringggg'
    }
    qty: number = 1;
  constructor() { }

  ngOnInit() {
  }

}
