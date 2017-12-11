import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { ExampleRoutingModule, routedComponents } from './example-routing.module';

@NgModule({
  imports: [ThemeModule, ExampleRoutingModule],
  declarations: [...routedComponents],
})
export class ExampleModule {}
