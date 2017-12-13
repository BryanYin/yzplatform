import './vendor.ts';

import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2Webstorage } from 'ngx-webstorage';

import { CdbGradeSharedModule, UserRouteAccessService } from './shared';
import { CdbGradeAppRoutingModule} from './app-routing.module';
import { CdbGradeAdminModule } from './shared/yz-admin/admin.module';
import { CdbGradeAccountModule } from './shared/yz-account/account.module';
import { CdbGradeEntityModule } from './entities/entity.module';
import { customHttpProvider } from './shared/interceptor/http.provider';
import { PaginationConfig } from './shared/config/uib-pagination.config';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './@theme/theme.module';

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
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        ThemeModule.forRoot(),
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ AppComponent ]
})
export class CdbGradeAppModule {}
