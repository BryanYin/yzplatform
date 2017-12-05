import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { CdbGradeSharedModule, UserRouteAccessService } from './shared';
import { CdbGradeAppRoutingModule} from './app-routing.module';
import { CdbGradeHomeModule } from './home/home.module';
import { CdbGradeAdminModule } from './admin/admin.module';
import { CdbGradeAccountModule } from './account/account.module';
import { CdbGradeEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        CdbGradeAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        CdbGradeSharedModule,
        CdbGradeHomeModule,
        CdbGradeAdminModule,
        CdbGradeAccountModule,
        CdbGradeEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class CdbGradeAppModule {}
