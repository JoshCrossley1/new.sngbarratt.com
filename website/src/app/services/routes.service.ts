import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';

@Injectable()
export class DynamicRoutes {

    allRoutes:any[] = [
        {
            path: 'non-auth',
            component: NotFoundComponent
        },
        {
            path: 'auth',
            component: LoginComponent
        }
    ]

    activeRoutes: any[] = [];

    constructor(private router: Router) { }

    /*
    build = () => {
        this.allRoutes.forEach((route, i) => {
            this.activeRoutes.push(route)
        })
    }
    */

}
