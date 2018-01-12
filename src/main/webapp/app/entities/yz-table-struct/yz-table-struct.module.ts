import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CdbGradeSharedModule } from '../../shared';
import {
    YzTableStructService,
    YzTableStructPopupService,
    YzTableStructComponent,
    YzTableStructDetailComponent,
    YzTableStructDialogComponent,
    YzTableStructPopupComponent,
    YzTableStructDeletePopupComponent,
    YzTableStructDeleteDialogComponent,
    yzTableStructRoute,
    yzTableStructPopupRoute,
} from './';

const ENTITY_STATES = [
    ...yzTableStructRoute,
    ...yzTableStructPopupRoute,
];

@NgModule({
    imports: [
        CdbGradeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        YzTableStructComponent,
        YzTableStructDetailComponent,
        YzTableStructDialogComponent,
        YzTableStructDeleteDialogComponent,
        YzTableStructPopupComponent,
        YzTableStructDeletePopupComponent,
    ],
    entryComponents: [
        YzTableStructComponent,
        YzTableStructDialogComponent,
        YzTableStructPopupComponent,
        YzTableStructDeleteDialogComponent,
        YzTableStructDeletePopupComponent,
    ],
    providers: [
        YzTableStructService,
        YzTableStructPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CdbGradeYzTableStructModule {}
