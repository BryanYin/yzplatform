import { NgModule } from '@angular/core';
import { RouterModule, ExtraOptions, Routes } from '@angular/router';
import { showLoginRoutes } from './shared/yz-service/yz-route.service';
import { environment } from '../environments/environment';

const defaultPath = environment.showLogin ? 'login' : 'pages';

const routes: Routes = [
    { path: 'login', loadChildren: './shared/yz-login/login.module#YzLoginModule' },
    showLoginRoutes({ path: 'pages', loadChildren: './pages/pages.module#PagesModule', data: { authorities: ['ROLE_USER'] } }),
    { path: '', redirectTo: defaultPath, pathMatch: 'full' },
    { path: '**', redirectTo: defaultPath },
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
