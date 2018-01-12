import { Injectable, InjectionToken, Inject, FactoryProvider } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { GeneralEntity } from '../interfaces';
import { JhiDateUtils } from 'ng-jhipster';
import { ResponseWrapper, createRequestOption } from '../../shared';

export const GENERAL_ENTITY = new InjectionToken<GeneralEntity>('general.entity');
export const entityApiFactory = (http: HttpClient, dateUtils: JhiDateUtils, ge: GeneralEntity | Array<GeneralEntity>) => {
    return new EntityApiService(http, dateUtils, ge);
};

export function entityProvider(serviceClass: InjectionToken<GeneralEntity>): FactoryProvider {
    return {
        provide: serviceClass,
        useFactory: entityApiFactory,
        deps: [HttpClient, JhiDateUtils, GENERAL_ENTITY]
    };
}

/** this service should be provided by each entity component, so it is not start with prefix yz-
 example:
import { EntityApiService, GENERAL_ENTITY, entityApiFactory, entityProvider } from '../../../shared/yz-service/entity-api.service';
const GradeApiService = new InjectionToken<EntityApiService<Grade>>('apiService.grade');
@Component({
    selector: 'yz-example-page1',
    templateUrl: 'page1.component.html',
    providers: [
        entityProvider(GradeApiService),
        { provide: GENERAL_ENTITY, useValue: new Grade() },
    ],
})
*/
@Injectable()
export class EntityApiService<T extends GeneralEntity> {

    private resourceUrl = SERVER_API_URL;
    private typeIndicator: { new(): T; };

    constructor(
        private http: HttpClient,
        private dateUtils: JhiDateUtils,
        @Inject(GENERAL_ENTITY) ge: GeneralEntity | Array<GeneralEntity>) {
        let endpoint: string;
        if (ge instanceof Array) {
            const x = new this.typeIndicator();
            endpoint = ge.filter((g) => g.constructor.toString() === x.constructor.toString()).pop().endpoint;
        } else {
            endpoint = ge.endpoint;
        }
        this.resourceUrl = SERVER_API_URL + endpoint;
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
        const result = [];
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
        entity.dbTime = this.dateUtils
            .convertDateTimeFromServer(json.dbTime);
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
