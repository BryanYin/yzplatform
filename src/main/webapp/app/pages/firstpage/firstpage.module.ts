import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FirstPageComponent } from './firstpage.component';

@NgModule({
  imports: [ThemeModule],
  declarations: [
    FirstPageComponent,
  ],
})
export class FirstPageModule {}
