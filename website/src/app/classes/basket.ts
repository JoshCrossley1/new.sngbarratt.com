import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export class Basket {

    private details: BehaviorSubject<any> = new BehaviorSubject<any>(null)

    update = (d) => {
        this.details.next(d);
    }

    get(): Observable<any> {
        return this.details.asObservable();
    }

}
