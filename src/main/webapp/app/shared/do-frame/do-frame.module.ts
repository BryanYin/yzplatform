import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DoFrameComponent } from './do-frame.component';
import { DoEChartsModule } from '../../shared/do-echarts/do-echarts.module';
import { DoServiceModule } from '../do-service/do-service.module';
import { CodeHighlighterModule } from 'primeng/components/codehighlighter/codehighlighter';
import { MenubarModule } from 'primeng/components/menubar/menubar';


@NgModule({
  imports: [ThemeModule, DoEChartsModule, DoServiceModule, MenubarModule, CodeHighlighterModule],
  exports: [DoFrameComponent],
  declarations: [
    DoFrameComponent,
  ],
})
export class DoFrameModule { }
