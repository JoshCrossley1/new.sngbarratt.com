import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'generic-search',
  templateUrl: './generic-search.component.html',
  styleUrls: ['./generic-search.component.css']
})
export class GenericSearchComponent implements OnInit {

    @Input() placeholder: string;
    @Input() columns: string;
    @Input() inputType: string;

    searchForm: FormGroup;    


    constructor() {
        this.searchForm = new FormGroup({
            searchInput: new FormControl()
        })
    }

    
  ngOnInit() {
  }

}
