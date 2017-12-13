import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
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

    get(endpoint: string, params?: any, options?: any) {
        if (params) {
            if (!options) {
                options = { 'params': params };
            } else {
                options['params'] = params;
            }
        }
        return this.http.get(this.url + '/' + endpoint, options);
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
