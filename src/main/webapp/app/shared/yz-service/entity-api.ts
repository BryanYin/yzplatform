import { Injectable, InjectionToken, Inject, FactoryProvider } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Entity } from '../interfaces';
import { ResponseWrapper, createRequestOption } from '../../shared';

/** this entityApi should be able to serve multiple entities in one component, so write it as normal class not service.
*/
export class EntityApiService<T extends Entity> {

    private resourceUrl = SERVER_API_URL;
    private http: HttpClient;

    constructor(httpClient: HttpClient, entity: T) {
        this.http = httpClient;
        this.resourceUrl = SERVER_API_URL + entity.endpoint;
    }

    create(entity: T): Observable<T> {
        const copy = this.convert(entity);
        return this.http.post<T>(this.resourceUrl, copy).map((res) => {
            return this.convertItemFromServer(res);
        });
    }

    update(entity: T): Observable<T> {
        const copy = this.convert(entity);
        return this.http.put<T>(this.resourceUrl, copy).map((res) => {
            return this.convertItemFromServer(res);
        });
    }

    find(id: number): Observable<T> {
        return this.http.get<T>(`${this.resourceUrl}/${id}`).map((res) => {
            return this.convertItemFromServer(res);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get<HttpResponse<T>>(this.resourceUrl, options)
            .map((res) => this.convertResponse(res));
    }

    delete(id: number): Observable<T> {
        return this.http.delete<T>(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res): ResponseWrapper {
        const result: T[] = [];
        for (let i = 0; i < res.length; i++) {
            result.push(this.convertItemFromServer(res[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to T.
     */
    private convertItemFromServer(json: any): T {
        const entity: T = Object.assign({}, json);
        for (const key in entity) {
            if (entity.hasOwnProperty(key) && <any>entity[key] instanceof Date && json.hasOwnProperty(key)) {
                entity[key] = new Date(json[key]);
            }
        }
        return entity;
    }

    /**
     * Convert a T to a JSON which can be sent to the server.
     */
    private convert(entity: T): T {
        const copy: T = Object.assign({}, entity);
        return copy;
    }
}
