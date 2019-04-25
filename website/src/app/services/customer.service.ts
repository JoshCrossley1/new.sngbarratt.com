import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

    constructor(private _http: HttpClient) { }

    getCustomerByGuid = (guid) => {
        return this._http.get(
            `${environment.apiUrl}customers/` + guid
        )        
    }

}
