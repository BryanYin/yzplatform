import { Component, OnInit, Injector } from '@angular/core';
import { EntityApiService } from '../../shared/yz-service/entity-api';
import { YzSchemaTable, YzTableStruct } from '../../shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { ResponseWrapper } from '../../shared';

import { TreeNode, TreeDragDropService } from 'primeng/primeng';
import { SmartReportService } from './smart-report.service';
import { YzEchartsService } from '../../shared/yz-echarts/yz-echats.service';

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

    public treeData: TreeNode[] = [];

    public selectNames: TreeNode[];
    public selectValues: TreeNode[];

    public echartOption: any;
    public chartButtons: any = [
        { icon: 'fa-area-chart' },
        { icon: 'fa-bar-chart' },
        { icon: 'fa-line-chart' },
        { icon: 'fa-pie-chart' }
    ];

    constructor(
        private injector: Injector,
        private service: SmartReportService,
        private echartService: YzEchartsService
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
                        label: d.columnName,
                        data: { field: d.columnName, fieldType: d.dataType },
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

    btnClicked(e, i) {
        switch (i) {
            case 0: // area-chart
            this.echartOption = this.echartService.getLineChartOptionTemplate();
                break;
            case 1: // bar-chart

                break;
            case 2: // line-chart

                break;
            case 3: // pie-chart

                break;
            default:
                break;
        }
    }
}
