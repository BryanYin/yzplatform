import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { SERVER_API_URL } from '../../app.constants';
import { User } from './user.model';
import { ResponseWrapper } from '../model/response-wrapper.model';
import { createRequestOption } from '../model/request-util';

@Injectable()
export class UserService {
    private resourceUrl = SERVER_API_URL + 'api/users';

    constructor(private http: HttpClient) { }

    create(user: User): Observable<ResponseWrapper> {
        return this.http.post<HttpResponse<Object>>(this.resourceUrl, user)
            .map((res: HttpResponse<Object>) => this.convertResponse(res));
    }

    update(user: User): Observable<ResponseWrapper> {
        return this.http.put<HttpResponse<Object>>(this.resourceUrl, user)
            .map((res: HttpResponse<Object>) => this.convertResponse(res));
    }

    find(login: string): Observable<User> {
        return this.http.get(`${this.resourceUrl}/${login}`);
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get<HttpResponse<Object>>(this.resourceUrl, options)
            .map((res: HttpResponse<any>) => this.convertResponse(res));
    }

    delete(login: string): Observable<Object> {
        return this.http.delete(`${this.resourceUrl}/${login}`);
    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
    }

    private convertResponse(res: HttpResponse<any>): ResponseWrapper {
        return new ResponseWrapper(res.headers, res.body, res.status);
    }
}
