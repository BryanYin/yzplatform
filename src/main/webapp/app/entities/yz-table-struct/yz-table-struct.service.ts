import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { YzTableStruct } from './yz-table-struct.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class YzTableStructService {

    private resourceUrl =  SERVER_API_URL + 'api/yz-table-structs';

    constructor(private http: Http) { }

    create(yzTableStruct: YzTableStruct): Observable<YzTableStruct> {
        const copy = this.convert(yzTableStruct);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(yzTableStruct: YzTableStruct): Observable<YzTableStruct> {
        const copy = this.convert(yzTableStruct);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<YzTableStruct> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to YzTableStruct.
     */
    private convertItemFromServer(json: any): YzTableStruct {
        const entity: YzTableStruct = Object.assign(new YzTableStruct(), json);
        return entity;
    }

    /**
     * Convert a YzTableStruct to a JSON which can be sent to the server.
     */
    private convert(yzTableStruct: YzTableStruct): YzTableStruct {
        const copy: YzTableStruct = Object.assign({}, yzTableStruct);
        return copy;
    }
}
