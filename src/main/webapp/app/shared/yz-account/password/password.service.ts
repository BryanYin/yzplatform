import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PasswordService {

    constructor(private http: Http) {}

    save(newPassword: string): Observable<any> {
        return this.http.post(environment.apiurl + 'api/account/change-password', newPassword);
    }
}
