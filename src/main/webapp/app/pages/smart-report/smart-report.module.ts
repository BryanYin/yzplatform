import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartReportComponent } from './smart-report.component';
import { SmartReportRoutingModule, routedComponents } from './smart-report-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { TreeModule, ListboxModule, DragDropModule, ButtonModule, CheckboxModule } from 'primeng/primeng';
import { SmartReportService } from './smart-report.service';
import { YzEChartsModule } from '../../shared/yz-echarts/yz-echarts.module';

const PrimeNgModules = [
    TreeModule,
    ListboxModule,
    DragDropModule,
    ButtonModule,
    CheckboxModule
];

@NgModule({
    imports: [
        CommonModule,
        SmartReportRoutingModule,
        ThemeModule,
        YzEChartsModule,
        ...PrimeNgModules],
    exports: [],
    declarations: [...routedComponents],
    providers: [SmartReportService],
})
export class SmartReportModule { }
