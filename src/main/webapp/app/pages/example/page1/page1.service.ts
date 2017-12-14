import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Grade } from '../../../shared/interfaces';

@Injectable()
export class Page1Service {
    constructor(private httpClient: HttpClient) { }

    public getMockData() {
        return MOCK_DATA;
    }
}

const MOCK_DATA = [
    new Grade('企业A', 1, 1, 1, 1, 1, 1),
];
