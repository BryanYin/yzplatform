import { NgModule } from '@angular/core';

import { HttpService } from './http-api.service';
import { EntityApiService } from './entity-api.service';
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
    HttpService,
    EntityApiService,
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
