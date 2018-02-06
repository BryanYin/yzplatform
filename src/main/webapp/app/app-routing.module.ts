import { NgModule } from '@angular/core';
import { RouterModule, ExtraOptions, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { errorRoute } from './@theme/components/error/error.route';
import { YzLoginComponent } from './shared/yz-login/login.component';

const defaultPath = environment.showLogin ? 'login' : 'pages';

const routes: Routes = [
    { path: 'login', component: YzLoginComponent },
    { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
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
