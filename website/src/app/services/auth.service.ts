import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'; 

@Injectable({
    providedIn: 'root'  
})
export class AuthService {

    constructor(private _http: HttpClient, public jwtHelper: JwtHelperService) { }

    //interceptor should apply access_token as bearer for auth requests

    //getAuthToken
    //check expiration
    //refreshToken if needed

    //logOut

    decodeToken = (token) => {
        return this.jwtHelper.decodeToken(token);
    }

    refreshToken = (token) => {

    }

    getAuthToken = () => {
        
    }

    login = (req) => {
        return this._http.post(
            `${environment.apiUrl}auth/token`, req
        )            
    }

    getLocalStorage(str) {
        let response = window.localStorage.getItem(str)
        return response
    }

}
