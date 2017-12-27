import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

@Injectable()
export class AuthServerProvider {

    constructor(
        private http: HttpClient
    ) {}

    login(credentials): Observable<any> {
        const data = 'j_username=' + encodeURIComponent(credentials.username) +
            '&j_password=' + encodeURIComponent(credentials.password) +
            '&remember-me=' + credentials.rememberMe + '&submit=Login';
        const header = new HttpHeaders ({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return this.http.post(SERVER_API_URL + 'api/authentication', data, { headers: header });
    }

    logout(): Observable<any> {
        // logout from the server
        return this.http.post(SERVER_API_URL + 'api/logout', {}).map((response) => {
            // to get a new csrf token call the api
            this.http.get(SERVER_API_URL + 'api/account').subscribe(() => {}, () => {});
            return response;
        });
    }
}
