import { NgModule } from '@angular/core';

import { HttpApi } from './http-api.service';
import { YzRouteService } from './yz-route.service';

const services = [
    HttpApi,
    YzRouteService,
];

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [...services],
})
export class YzServiceModule { }
