import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CdbGradeSharedModule } from '../../shared';
import {
    YzSchemaTableService,
    YzSchemaTablePopupService,
    YzSchemaTableComponent,
    YzSchemaTableDetailComponent,
    YzSchemaTableDialogComponent,
    YzSchemaTablePopupComponent,
    YzSchemaTableDeletePopupComponent,
    YzSchemaTableDeleteDialogComponent,
    yzSchemaTableRoute,
    yzSchemaTablePopupRoute,
} from './';

const ENTITY_STATES = [
    ...yzSchemaTableRoute,
    ...yzSchemaTablePopupRoute,
];

@NgModule({
    imports: [
        CdbGradeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        YzSchemaTableComponent,
        YzSchemaTableDetailComponent,
        YzSchemaTableDialogComponent,
        YzSchemaTableDeleteDialogComponent,
        YzSchemaTablePopupComponent,
        YzSchemaTableDeletePopupComponent,
    ],
    entryComponents: [
        YzSchemaTableComponent,
        YzSchemaTableDialogComponent,
        YzSchemaTablePopupComponent,
        YzSchemaTableDeleteDialogComponent,
        YzSchemaTableDeletePopupComponent,
    ],
    providers: [
        YzSchemaTableService,
        YzSchemaTablePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CdbGradeYzSchemaTableModule {}
