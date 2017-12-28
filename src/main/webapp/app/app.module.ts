import './vendor.ts';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2Webstorage } from 'ngx-webstorage';

<<<<<<< HEAD
import { CdbGradeSharedModule, UserRouteAccessService } from './shared';
import { CdbGradeAppRoutingModule } from './app-routing.module';
=======
import { CdbGradeSharedModule } from './shared';
import { UserRouteAccessService } from './shared/yz-service/auth';
import { CdbGradeAppRoutingModule} from './app-routing.module';
>>>>>>> master
import { CdbGradeAdminModule } from './shared/yz-admin/admin.module';
import { CdbGradeAccountModule } from './shared/yz-account/account.module';
import { CdbGradeEntityModule } from './entities/entity.module';
import { PaginationConfig } from './shared/config/uib-pagination.config';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './@theme/theme.module';
<<<<<<< HEAD
import { YzServiceModule } from './shared/yz-service/yz-service.module';
=======
import { YzLoginModule } from './shared/yz-login/login.module';
>>>>>>> master

// jhipster-needle-angular-add-module-import JHipster will add new module here

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        CdbGradeAppRoutingModule,
        FormsModule,
        Ng2Webstorage.forRoot({ prefix: 'yz', separator: '-'}),
        CdbGradeSharedModule,
        CdbGradeAdminModule,
        CdbGradeAccountModule,
        CdbGradeEntityModule,
        YzLoginModule,
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
