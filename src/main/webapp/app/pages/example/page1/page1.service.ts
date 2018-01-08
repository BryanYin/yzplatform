import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grade } from '../../../shared/interfaces';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Page1Service {
    constructor(private http: HttpClient) { }

    public getInitData(): Observable<any> {
        if (environment.useMock) {
            return Observable.of(MOCK_DATA);
        } else {
            return this.http.get('api/grades');
        }
    }
}

const MOCK_DATA = [
    new Grade('企业A', 1, 1, 1, 1, 1, 1, 1, 'china', '20170809 12:30:43'),
];
