import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../../app.constants';

@Injectable()
export class ActivateService {

    constructor(private http: Http) {}

    get(key: string): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('key', key);

        return this.http.get(SERVER_API_URL + 'api/activate', {
            search: params
        });
    }
}
