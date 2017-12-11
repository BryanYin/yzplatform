import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleComponent } from './example.component';
import { Page1Component } from './page1/page1.component';

const routes: Routes = [{
  path: '',
  component: ExampleComponent,
  children: [{
    path: 'page1',
    component: Page1Component,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExampleRoutingModule { }

export const routedComponents = [
  ExampleComponent,
  Page1Component,
];
