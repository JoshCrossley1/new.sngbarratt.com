import { Injectable } from '@angular/core';

import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class JwtOptionsFactoryService {

    constructor(private authService: AuthService) { }

    public tokenGetter = () => this.authService.getAuthToken();

    public refreshToken = (token) => {

    }

    public checkExpiration = (token) => {

    }
    

}
