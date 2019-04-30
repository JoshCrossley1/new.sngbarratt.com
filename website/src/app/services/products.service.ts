import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, map, tap, debounceTime, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    constructor(private _http: HttpClient) {
    }

    getProducts = () => {
        return this._http.get(
            `${environment.apiUrl}uk/products/search/phrase?phrase=b2lsIGZpbHRlcg%3D%3D`)        
    }

    getProduct = (guid) => {
        return this._http.get(
            `${environment.apiUrl}uk/products/` + guid)
    }

    searchProducts(partNumber: Observable<string>){
       //todo - set sitecode dynamic
        return partNumber
            .pipe(
             debounceTime(400),
             switchMap(partNumber => this.searchInit(partNumber)))                
    }

    searchInit = (partNumber) => {
        let pn = btoa(partNumber);
        return this._http.get(
            `${environment.apiUrl}uk/products/search/partno?partNumber=` + pn)
        //if nothing is found, try the search/phrase endpoint
    }

}
