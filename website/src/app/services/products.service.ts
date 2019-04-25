import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

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

    getBuddies = (guid) => {
        return this._http.get(
            `${environment.apiUrl}uk/products/` + guid)
    }
}
