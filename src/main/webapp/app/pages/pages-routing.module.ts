import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { FirstPageComponent } from './firstpage/firstpage.component';
import { UserRouteAccessService } from '../shared/yz-service/auth';
import { environment } from '../../environments/environment';

export const PageRoutes: Routes = [{
  path: '',
  canActivate: [UserRouteAccessService],
  component: PagesComponent,
  children: [
    //   {
    //   path: 'firstpage',
    //   component: FirstPageComponent,
    // },
    {
      path: 'smart-report',
      loadChildren: './smart-report/smart-report.module#SmartReportModule',
    },
    {
      path: 'example',
      loadChildren: './example/example.module#ExampleModule',
    }, {
      path: '',
      redirectTo: 'example',
      pathMatch: 'full',
    }], data: environment.showLogin ? { authorities: ['ROLE_USER'] } : null
}];

@NgModule({
  imports: [RouterModule.forChild(PageRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
