import { NgModule } from '@angular/core';
import { DoEchartsComponent } from './do-echarts.component';
import { DoEchartsService } from './do-echats.service';
import { DoEchartsDirective } from './do-echarts.directive';

const components = [
  DoEchartsComponent,
  DoEchartsDirective,
];

@NgModule({
  imports: [],
  exports: [...components],
  providers: [DoEchartsService],
  declarations: [...components],
})
export class DoEChartsModule {}
