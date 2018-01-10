import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { GeneralEntity } from '../interfaces';
import { JhiDateUtils } from 'ng-jhipster';
import { ResponseWrapper, createRequestOption } from '../../shared';

export const ENTITY_ENDPOINT = new InjectionToken<string>('entity.endpoint');

/** this service should be provided by each entity component, so it is not start with prefix yz-
 example:
 import { EntityApiService, ENTITY_ENDPOINT } from '../../../shared/yz-service/entity-api.service';
 @Component({
    selector: 'yz-example-page1',
    templateUrl: 'page1.component.html',
    providers: [
        EntityApiService,
        {provide: ENTITY_ENDPOINT, useValue: 'api/grades'}
    ],
})
*/
@Injectable()
export class EntityApiService {

    private resourceUrl = SERVER_API_URL;

    constructor(
        private http: HttpClient,
        private dateUtils: JhiDateUtils,
        @Inject(ENTITY_ENDPOINT) endpoint: string ) {
        this.resourceUrl = SERVER_API_URL + endpoint;
    }

    create<T extends GeneralEntity>(entity: T): Observable<T> {
        const copy = this.convert(entity);
        return this.http.post<T>(this.resourceUrl, copy).map((res) => {
            return this.convertItemFromServer(res);
        });
    }

    update<T extends GeneralEntity>(entity: T): Observable<T> {
        const copy = this.convert(entity);
        return this.http.put<T>(this.resourceUrl, copy).map((res) => {
            return this.convertItemFromServer(res);
        });
    }

    find<T extends GeneralEntity>(id: number): Observable<T> {
        return this.http.get<T>(`${this.resourceUrl}/${id}`).map((res) => {
            return this.convertItemFromServer(res);
        });
    }

    query<T extends GeneralEntity>(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get<HttpResponse<T>>(this.resourceUrl, options)
            .map((res) => this.convertResponse(res));
    }

    delete<T extends GeneralEntity>(id: number): Observable<T> {
        return this.http.delete<T>(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res): ResponseWrapper {
        const result = [];
        for (let i = 0; i < res.length; i++) {
            result.push(this.convertItemFromServer(res[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to T.
     */
    private convertItemFromServer<T extends GeneralEntity>(json: any): T {
        const entity: T = Object.assign({}, json);
        entity.dbTime = this.dateUtils
            .convertDateTimeFromServer(json.dbTime);
        return entity;
    }

    /**
     * Convert a T to a JSON which can be sent to the server.
     */
    private convert<T extends GeneralEntity>(entity: T): T {
        const copy: T = Object.assign({}, entity);
        return copy;
    }
}
