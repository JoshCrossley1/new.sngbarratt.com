import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class Basket {

    private details: BehaviorSubject<any> = new BehaviorSubject<any>(null)

    update = (d) => {
        this.details.next(d);
        let jsonD = JSON.stringify(d)
        localStorage.setItem('basket', jsonD)
    }

    get(): Observable<any> {
        return this.details.asObservable();
    }

}
