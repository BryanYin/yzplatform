import { NgModule } from '@angular/core';
import { YzEchartsComponent } from './yz-echarts.component';
import { YzEchartsService } from './yz-echats.service';
import { YzEchartsDirective } from './yz-echarts.directive';

const components = [
  YzEchartsComponent,
  YzEchartsDirective,
];

@NgModule({
  imports: [],
  exports: [...components],
  providers: [YzEchartsService],
  declarations: [...components],
})
export class YzEChartsModule {}
