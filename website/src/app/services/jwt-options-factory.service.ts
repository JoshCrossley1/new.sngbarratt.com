import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class JwtOptionsFactoryService {

    constructor(private authService: AuthService) { }

    public tokenGetter = () => {
        console.log('TOKEN GETTER JWT SERVICE')
        this.authService.getAuthToken();
    }

    public refreshToken = (token) => {
        console.log('REFRESH TOKEN')
    }

    public checkExpiration = (token) => {

    }
}
