import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { FirstPageComponent } from './firstpage/firstpage.component';

export const PageRoutes: Routes = [{
  path: 'pages',
  component: PagesComponent,
  children: [{
    path: 'firstpage',
    component: FirstPageComponent,
  }, {
    path: 'example',
    loadChildren: './example/example.module#ExampleModule',
  }, {
    path: '',
    redirectTo: 'firstpage',
    pathMatch: 'full',
  }], data: { authorities: ['ROLE_USER'] }
}];

@NgModule({
  imports: [RouterModule.forChild(PageRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
