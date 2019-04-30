import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt'; 
import { UserService } from '../services/user.service';
 
import { Customer } from '../classes/customer';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _httpSkipAuth: HttpClient;        

    //using httpBackend to perform a http request without invoking the interceptor
    constructor(_httpBackend: HttpBackend, private _http: HttpClient, private customerClass: Customer, private userService: UserService) {
        this._httpSkipAuth = new HttpClient(_httpBackend);       
    }

    getHeaders = () => {
        let httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'X-Client-Id': '2FC6E2AC-18D6-462E-A662-FF6BC75968C9'
            })
        }
        return httpOptions;
    }

    jwtHelper: any = new JwtHelperService();

    //load auth token from localStorage
    getAuthToken = () => {
        console.log('getauth token')
        if (localStorage.getItem('access_token')) {
            //parse so we can add to a string containing 'bearer '
            return JSON.parse(localStorage.getItem('access_token'))
        } else {
            return 'no_token'
        }
    }

    decodeToken = (token) => {
        return this.jwtHelper.decodeToken(token);
    }

    getTokenExpirationDate = (token) => {
        return this.jwtHelper.getTokenExpirationDate(token);
    }

    isTokenExpired = (token) => {       
        return this.jwtHelper.isTokenExpired(token);        
    }

    refreshToken = (token, clientId) => {        
        return this._httpSkipAuth.post(
            `${environment.apiUrl}auth/token`, `refresh_token=` + token + `&client_id=` + clientId + `&grant_type=refresh_token`, this.getHeaders()
        )
    }
    
    //load refresh token from localStorage
    getRefreshToken = () => {
        if (localStorage.getItem('refreshToken')) {
            return JSON.parse(localStorage.getItem('refreshToken'))
        } else {
            return 'no_token'
        }
    }

    login = (req) => {
        return this._http.post(
            `${environment.apiUrl}auth/token`, req
        )            
    }    

    logout = () => {
        this.userService.clearLocalStorage('access_token')
        this.userService.clearLocalStorage('refreshToken')
        let guestCust = {
            customerGuid: 'guest'
        }
        this.customerClass.update(guestCust);
    }

    
    //idea, use httpbackend which will directly communicate with api without the interceptor being invoked. 
    //manually set the http headers and then hit endpoint

    loadProductData = () => {
        return this._httpSkipAuth.get(
            `${environment.apiUrl}uk/products/suggest?partNumber=QUo4MTAwMjQ%3D`, this.getHeaders()
        )
    }

}
