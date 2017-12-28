import { NgModule } from '@angular/core';

import { HttpApi } from './http-api.service';
import { YzRouteService } from './yz-route.service';
import {
    AccountService,
    AuthServerProvider,
    CSRFService,
    HasAnyAuthorityDirective,
    LoginModalService,
    LoginService,
    Principal,
    StateStorageService,
    UserRouteAccessService
} from './auth';

const AUTH_SERVICES = [
    AccountService,
    AuthServerProvider,
    CSRFService,
    LoginModalService,
    LoginService,
    Principal,
    StateStorageService,
    UserRouteAccessService
];

const services = [
    HttpApi,
    YzRouteService,
    ...AUTH_SERVICES,
];

@NgModule({
    imports: [],
    exports: [HasAnyAuthorityDirective],
    declarations: [HasAnyAuthorityDirective],
    providers: [...services],
})
export class YzServiceModule { }
