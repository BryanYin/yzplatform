import { NgModule } from '@angular/core';
import { RouterModule, ExtraOptions, Routes } from '@angular/router';
import { showLoginRoutes } from './shared/yz-service/yz-route.service';
import { environment } from '../environments/environment';
import { errorRoute } from './@theme/components/error/error.route';
import { YzLoginComponent } from './shared/yz-login/login.component';
import { PageRoutes } from './pages/pages-routing.module';

const defaultPath = environment.showLogin ? 'login' : 'pages';

const routes: Routes = [
    { path: 'login', component: YzLoginComponent },
    ...showLoginRoutes(PageRoutes),
    { path: '', redirectTo: defaultPath, pathMatch: 'full' },
    { path: '**', redirectTo: defaultPath },
    ...errorRoute
];

const config: ExtraOptions = {
    useHash: true,
};

@NgModule({
    imports: [
        RouterModule.forRoot(routes, config)
    ],
    exports: [
        RouterModule
    ]
})
export class CdbGradeAppRoutingModule { }

export const PAGES_PATH = 'pages';
