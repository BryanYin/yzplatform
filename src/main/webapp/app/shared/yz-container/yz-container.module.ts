import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YzContainerComponent } from './yz-container.component';
import { YzEChartsModule } from '../yz-echarts/yz-echarts.module';

@NgModule({
  imports: [
    CommonModule, YzEChartsModule,
  ],
  exports: [YzContainerComponent],
  declarations: [YzContainerComponent],
})
export class DoContainerModule { }
