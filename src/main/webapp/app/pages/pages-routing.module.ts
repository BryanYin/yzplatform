import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { FirstPageComponent } from './firstpage/firstpage.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
  //   {
  //   path: 'firstpage',
  //   component: FirstPageComponent,
  // },
  {
    path: 'example',
    loadChildren: './example/example.module#ExampleModule',
  }, {
    path: '',
    redirectTo: 'example',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
