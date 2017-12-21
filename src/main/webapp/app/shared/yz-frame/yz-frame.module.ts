import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { YzFrameComponent } from './yz-frame.component';
import { YzEChartsModule } from '../yz-echarts/yz-echarts.module';
import { YzServiceModule } from '../yz-service/yz-service.module';
import { CodeHighlighterModule } from 'primeng/components/codehighlighter/codehighlighter';
import { MenubarModule } from 'primeng/components/menubar/menubar';

@NgModule({
  imports: [ThemeModule, YzEChartsModule, YzServiceModule, MenubarModule, CodeHighlighterModule],
  exports: [YzFrameComponent],
  declarations: [
    YzFrameComponent,
  ],
})
export class YzFrameModule { }
