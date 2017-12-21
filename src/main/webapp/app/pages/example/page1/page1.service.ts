import { Injectable } from '@angular/core';
import { HttpApi } from '../../../shared/yz-service/http-api.service';
import { Observable } from 'rxjs';
import { Grade } from '../../../shared/interfaces';
import { environment } from '../../../../environments/environment';

@Injectable()
export class Page1Service {
    constructor(private http: HttpApi) { }

    public getInitData(): Observable<any> {
        if (environment.useMock) {
            return Observable.of(MOCK_DATA);
        } else {
            return this.http.get('api/grades');
        }
    }
}

const MOCK_DATA = [
    new Grade('企业A', 1, 1, 1, 1, 1, 1),
];
