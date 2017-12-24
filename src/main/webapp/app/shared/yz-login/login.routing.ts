import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YzLoginComponent } from './login.component';

const routes: Routes = [
  { path: '', component: YzLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YzLoginRoutingModule { }

export const routedComponents = [YzLoginComponent];
