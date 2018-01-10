import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthServerProvider } from '../../shared/yz-service/auth/auth-session.service';
import { StateStorageService } from '../../shared/yz-service/auth/state-storage.service';
import { Router } from '@angular/router';
import { Injector } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {

    constructor(
        private injector: Injector,
        private stateStorageService: StateStorageService,
        private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch((err: any, caught) => {
            if (err instanceof HttpResponse && err.status === 401 && !err.url.includes('/api/account')) {
                const destination = this.stateStorageService.getDestinationState();
                if (destination !== null) {
                    const to = destination.destination;
                    const toParams = destination.params;
                    if (to.name === 'accessdenied') {
                        this.stateStorageService.storePreviousState(to.name, toParams);
                    }
                } else {
                    this.stateStorageService.storeUrl('/');
                }
                const authServer: AuthServerProvider = this.injector.get(AuthServerProvider);
                authServer.logout();
                this.router.navigate(['/login']);
            }
            return Observable.throw(err);
        });
    }
}
