import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    CdbGradeSharedLibsModule,
    CdbGradeSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    Principal,
    HasAnyAuthorityDirective,
} from './';

@NgModule({
    imports: [
        CdbGradeSharedLibsModule,
        CdbGradeSharedCommonModule,
    ],
    declarations: [
        HasAnyAuthorityDirective
    ],
    providers: [
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [],
    exports: [
        CdbGradeSharedCommonModule,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class CdbGradeSharedModule {}
