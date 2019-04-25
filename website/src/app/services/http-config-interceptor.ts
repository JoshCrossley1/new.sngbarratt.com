import { Injectable, Injector } from '@angular/core';
//import { ErrorDialogService } from '../error-dialog/errordialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private userService: UserService) {

    }

    addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        
        request = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + token)
        })
        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        })

        request = request.clone({
            headers: request.headers.set('X-Client-Id', '2FC6E2AC-18D6-462E-A662-FF6BC75968C9')
        })

        if (!request.headers.has('Content-Type')) {         
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        return request
        //return request.clone({ setHeaders: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token, 'Cache-Control': 'no-cache', 'Pragma': 'no-cache'  }})
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   

        const token: string = localStorage.getItem('access_token');

        /*
        ideally, this is similar to how we would hanle
        console.log('intercept')
        console.log(request)
        if (request.headers.has('skipauth')) {
            console.log('IT HAS SKIP HEADER!!!')
            request.headers.delete('skipauth');
            console.log(request)
        }*/

        if (token) {
            
            //get token expiration date, then check if token is expired

            let tokenExpired = this.isTokenExpired(token);
            if (tokenExpired) {
                //if token is expired, check if we have a refresh token
                let refreshToken = this.authService.getRefreshToken()
                if (refreshToken) {
                    console.log('REFRESH TOKEN')
                    this.authService.refreshToken(refreshToken, '2FC6E2AC-18D6-462E-A662-FF6BC75968C9')
                        .subscribe((r: any) => {
                            console.log(r)
                            this.userService.setLocalStorage('refreshToken', r.refresh_token);
                            this.userService.setLocalStorage('access_token', r.access_token);
                        }, error => {
                            console.log(error)
                            this.clearAllTokens()

                            //below 2 lines is used for testing, to see why grant has failed
                            let t = this.authService.getAuthToken()
                            console.log(this.authService.isTokenExpired(t));
                        })
                } else {
                    //user needs to log back in
                    window.alert('USER NEEDS TO LOG BACK IN')
                }
            }
        }

        return next.handle(this.addToken(request, this.authService.getAuthToken()))            
            .pipe(map((event: HttpEvent<any>) => {
                console.log('http next.handle')
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }), catchError((error: HttpErrorResponse) => {

                // if error, check if token is expired, then try and refresh token

                if (error.status == 401) {

                }

                window.alert('HTTP ERROR ' + error.status )
                console.log('CATCH HTTTP ERRROR ')
                console.log(error)
                return throwError('ERROR')
            }))
    }


    isTokenExpired = (token) => {
        //let tokenExpDate = this.authService.getTokenExpirationDate(token);
        return this.authService.isTokenExpired(token);
    }

    clearAllTokens = () => {
        this.userService.clearLocalStorage('access_token');
        this.userService.clearLocalStorage('refreshToken');
    }

}
