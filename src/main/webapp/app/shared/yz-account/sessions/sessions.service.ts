import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Session } from './session.model';

import { environment } from '../../../../environments/environment';

@Injectable()
export class SessionsService {

    private resourceUrl = environment.apiurl + 'api/account/sessions/';
    constructor(private http: Http) { }

    findAll(): Observable<Session[]> {
        return this.http.get(this.resourceUrl).map((res: Response) => res.json());
    }

    delete(series: string): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}${series}`);
    }
}
