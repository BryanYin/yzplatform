import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ButtonModule, DataTableModule, DialogModule, SharedModule } from 'primeng/primeng';
import { ExampleRoutingModule, routedComponents } from './example-routing.module';
import { Page1Service } from './page1/page1.service';

@NgModule({
  imports: [ThemeModule, ExampleRoutingModule,
    ButtonModule, DataTableModule, DialogModule, SharedModule],
  declarations: [...routedComponents],
  providers: [Page1Service],
})
export class ExampleModule { }
