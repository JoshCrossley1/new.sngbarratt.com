import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

    results: any;
    searchTerm$ = new Subject<string>();
    term: string;
    searchForm: FormGroup;
    
    constructor(private productsService: ProductsService) {

        this.searchForm = new FormGroup({
            searchInput: new FormControl()
        })

        this.productsService.searchProducts(this.searchTerm$)
            .subscribe((results: any) => {
                this.results = results.results;               
            })
    }

    searchTerm(term) {
        delete this.results;
        this.term = term;
        if (term) {
            this.searchTerm$.next(term)
        } else {
            //no search term            
            delete this.term;
        }
    }

  ngOnInit() {
  }

}
