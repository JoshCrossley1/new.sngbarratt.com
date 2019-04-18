import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor() { }

    setLocalStorage = (name, value) => {
        let jsonValue = JSON.stringify(value);
        localStorage.setItem(name, jsonValue)
    }

    getLocalStorage = (name) => {
        if (localStorage.getItem(name)){
            return localStorage.getItem(name);
        } else if (sessionStorage.getItem(name)) {
            return sessionStorage.getItem(name);
        }
    }
   
}
