import { Component, OnInit, Injector } from '@angular/core';
import { EntityApiService } from '../../shared/yz-service/entity-api';
import { YzSchemaTable, YzTableStruct } from '../../shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { ResponseWrapper } from '../../shared';

import { TreeNode, TreeDragDropService } from 'primeng/primeng';
import { SmartReportService, TableField } from './smart-report.service';
import { YzEchartsService } from '../../shared/yz-echarts/yz-echats.service';
import { YzToastService, ToastType, ToastPosition, ToastAnimation } from '../../shared/yz-service/yz-toast.service';

enum ChartTypes {
    BAR, LINE, PIE, AREA
}

@Component({
    selector: 'yz-smart-report',
    templateUrl: 'smart-report.component.html',
    styleUrls: ['./smart-report.component.scss'],
    providers: [TreeDragDropService]
})

export class SmartReportComponent implements OnInit {

    private tableNameApi: EntityApiService<YzSchemaTable>;
    private tableStructApi: EntityApiService<YzTableStruct>;

    private tableNames: string[] = [];
    private tableFields: Map<string, YzTableStruct[]> = new Map();

    public renew: boolean = false;
    public treeData: TreeNode[] = [];
    public selectNames: TreeNode[];
    public selectValues: TreeNode[];
    public echartOption: any = {};
    public chartButtons: any = [
        { icon: 'fa-bar-chart', type: ChartTypes.BAR },
        // { icon: 'fa-line-chart', type: ChartTypes.LINE },
        { icon: 'fa-pie-chart', type: ChartTypes.PIE },
        // { icon: 'fa-area-chart', type: ChartTypes.AREA},
    ];

    constructor(
        private injector: Injector,
        private service: SmartReportService,
        private echartService: YzEchartsService,
        private toaster: YzToastService
    ) {
        this.tableNameApi = new EntityApiService(this.injector.get(HttpClient), new YzSchemaTable());
        this.tableStructApi = new EntityApiService(this.injector.get(HttpClient), new YzTableStruct());
    }

    ngOnInit() {
        this.selectNames = this.service.selectedNames;
        this.selectValues = this.service.selectedValues;
        this.tableNameApi.query().subscribe(
            (data: ResponseWrapper) => { this.tableNames = data.json.map((d: YzSchemaTable) => d.tableName); },
        );
        this.tableStructApi.query().subscribe(
            (data: ResponseWrapper) => {
                data.json.forEach((row: YzTableStruct) => {
                    if (this.tableFields.has(row.tableName)) {
                        this.tableFields.set(row.tableName, this.tableFields.get(row.tableName).concat([row]));
                    } else {
                        this.tableFields.set(row.tableName, [row]);
                    }
                });
                if (this.tableFields.size > 0) {
                    this.treeData = this.convertDataToTreeData(this.tableFields);
                }
            },
        );
    }

    private convertDataToTreeData(tableFields: Map<string, YzTableStruct[]>): TreeNode[] {
        const ret = new Array<TreeNode>();
        tableFields.forEach((value, key) => {
            if (value.length > 0) {
                const parent: TreeNode = {
                    label: key,
                    data: key,
                    collapsedIcon: 'fa-table',
                    expandedIcon: 'fa-table',
                };
                const children: TreeNode[] = [];

                value.forEach((d) => {
                    children.push({
                        label: d.description || d.columnName,
                        data: new TableField(key, d.columnName, d.dataType),
                        collapsedIcon: 'fa-columns',
                        expandedIcon: 'fa-columns'
                    });
                });

                parent.children = children;
                ret.push(parent);
            }
        });
        return ret;
    }

    onDropNames(e): void {
        this.service.addSelectedName(e.dragNode);
        this.selectNames = this.service.selectedNames;
    }

    onDropValues(e): void {
        this.service.addSelectedValue(e.dragNode);
        this.selectValues = this.service.selectedValues;
    }

    btnClicked(btn: any) {
        if (!this.service.selectedValues[0].children || !this.service.selectedNames[0].children) {
            this.toaster.showToast('数轴数据错误', '分类轴或者数值轴没有选择数据列',
                ToastType.TYPE_WARNING, ToastPosition.TOP_FULL_WIDTH, ToastAnimation.FADE, 5000);
            return;
        }

        this.service.constructData(this.renew).subscribe((data) => {
            // console.log('data',data);
            if (!data || data.size === 0) {
                return;
            }
            switch (btn.type) {
                // case ChartTypes.AREA:
                //     this.echartOption = this.echartService.getAreaChartOptionTemplate(data);
                //         break;
                case ChartTypes.BAR:
                    this.echartOption = this.echartService.getBarChartOptionTemplate(data);
                    break;
                case ChartTypes.LINE:
                    this.echartOption = this.echartService.getLineChartOptionTemplate(data);
                    break;
                case ChartTypes.PIE:
                    this.echartOption = this.echartService.getPieChartOptionTemplate(data);
                    break;
                default:
                    break;
            }
        });
    }
}
