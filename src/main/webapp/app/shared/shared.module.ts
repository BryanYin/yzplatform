import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    CdbGradeSharedLibsModule,
    CdbGradeSharedCommonModule,
} from './';

@NgModule({
    imports: [
        CdbGradeSharedLibsModule,
        CdbGradeSharedCommonModule,
    ],
    declarations: [
    ],
    providers: [
        DatePipe
    ],
    entryComponents: [],
    exports: [
        CdbGradeSharedCommonModule,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class CdbGradeSharedModule {}
