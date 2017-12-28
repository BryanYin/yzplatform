import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../../app.constants';

@Injectable()
export class AccountService  {
    constructor(private http: HttpClient) { }

    get(): Observable<any> {
        return this.http.get(SERVER_API_URL + 'api/account');
    }

    save(account: any): Observable<Object> {
        return this.http.post(SERVER_API_URL + 'api/account', account);
    }
}
