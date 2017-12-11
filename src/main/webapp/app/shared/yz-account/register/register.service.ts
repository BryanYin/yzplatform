import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../../environments/environment';

@Injectable()
export class Register {

    constructor(private http: Http) {}

    save(account: any): Observable<any> {
        return this.http.post(environment.apiurl + 'api/register', account);
    }
}
