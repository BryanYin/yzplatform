import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { CdbGradeSharedModule, UserRouteAccessService } from './shared';
import { CdbGradeAppRoutingModule} from './app-routing.module';
import { CdbGradeAdminModule } from './shared/yz-admin/admin.module';
import { CdbGradeAccountModule } from './shared/yz-account/account.module';
import { CdbGradeEntityModule } from './entities/entity.module';
import { customHttpProvider } from './shared/interceptor/http.provider';
import { PaginationConfig } from './shared/config/uib-pagination.config';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';

// jhipster-needle-angular-add-module-import JHipster will add new module here

@NgModule({
    imports: [
        BrowserModule,
        CdbGradeAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'yz', separator: '-'}),
        CdbGradeSharedModule,
        CdbGradeAdminModule,
        CdbGradeAccountModule,
        CdbGradeEntityModule,
        PagesModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ AppComponent ]
})
export class CdbGradeAppModule {}
