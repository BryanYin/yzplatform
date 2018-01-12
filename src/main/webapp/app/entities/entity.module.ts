import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CdbGradeYzSchemaTableModule } from './yz-schema-table/yz-schema-table.module';
import { CdbGradeYzTableStructModule } from './yz-table-struct/yz-table-struct.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CdbGradeYzSchemaTableModule,
        CdbGradeYzTableStructModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CdbGradeEntityModule {}
