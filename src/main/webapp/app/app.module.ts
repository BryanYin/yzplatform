import './vendor.ts';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2Webstorage } from 'ngx-webstorage';

import { CdbGradeSharedModule, UserRouteAccessService } from './shared';
import { CdbGradeAppRoutingModule } from './app-routing.module';
import { CdbGradeAdminModule } from './shared/yz-admin/admin.module';
import { CdbGradeAccountModule } from './shared/yz-account/account.module';
import { CdbGradeEntityModule } from './entities/entity.module';
import { PaginationConfig } from './shared/config/uib-pagination.config';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './@theme/theme.module';
import { YzServiceModule } from './shared/yz-service/yz-service.module';

// jhipster-needle-angular-add-module-import JHipster will add new module here

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        CdbGradeAppRoutingModule,
<<<<<<< HEAD
        Ng2Webstorage.forRoot({ prefix: 'yz', separator: '-' }),
=======
        FormsModule,
        Ng2Webstorage.forRoot({ prefix: 'yz', separator: '-'}),
>>>>>>> master
        CdbGradeSharedModule,
        CdbGradeAdminModule,
        CdbGradeAccountModule,
        CdbGradeEntityModule,
        PagesModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        ThemeModule.forRoot(),

        YzServiceModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        PaginationConfig,
        NgbActiveModal,
        UserRouteAccessService
    ],
    bootstrap: [AppComponent]
})
export class CdbGradeAppModule { }
