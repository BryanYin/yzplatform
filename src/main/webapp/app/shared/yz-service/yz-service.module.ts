import { NgModule } from '@angular/core';

import { HttpApi } from './http-api.service';

const services = [
    HttpApi,
];

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [...services],
})
export class YzServiceModule { }
