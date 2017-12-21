import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class HttpApi {
    private url: string = 'https://no_base_URL_configured';

    constructor(public http: HttpClient) {
        if (SERVER_API_URL && SERVER_API_URL !== '') {
            this.url = SERVER_API_URL;
        }
    }

    public setURL(url: string) {
        this.url = url;
    }

    getByUrl<T>(url: string) {
        return this.http.get<T>(url);
    }

    get<T>(endpoint: string, params?: any, options?: {
        headers?: HttpHeaders;
        observe?: 'body';
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }) {
        if (params) {
            if (!options) {
                options = { 'params': params };
            } else {
                options['params'] = params;
            }
        }
        return this.http.get<T>(this.url + '/' + endpoint, options);
    }

    post(endpoint: string, body: any, options?: any) {
        return this.http.post(this.url + '/' + endpoint, body, options);
    }

    put(endpoint: string, body: any, options?: any) {
        return this.http.put(this.url + '/' + endpoint, body, options);
    }

    delete(endpoint: string, options?: any) {
        return this.http.delete(this.url + '/' + endpoint, options);
    }

    patch(endpoint: string, body: any, options?: any) {
        return this.http.put(this.url + '/' + endpoint, body, options);
    }
}
