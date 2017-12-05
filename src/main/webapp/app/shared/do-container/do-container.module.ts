import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoContainerComponent } from './do-container.component';
import { DoEChartsModule } from '../do-echarts/do-echarts.module';

@NgModule({
  imports: [
    CommonModule, DoEChartsModule,
  ],
  exports: [DoContainerComponent],
  declarations: [DoContainerComponent],
})
export class DoContainerModule { }
