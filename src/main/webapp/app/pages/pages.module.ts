import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { FirstPageModule } from './firstpage/firstpage.module';
import { PagesRoutingModule } from './pages-routing.module';
import { SmartReportModule } from './smart-report/smart-report.module';
import { ThemeModule } from '../@theme/theme.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    FirstPageModule,
    SmartReportModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
