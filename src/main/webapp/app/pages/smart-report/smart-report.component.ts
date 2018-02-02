import { Component, OnInit, Injector } from '@angular/core';
import { EntityApiService } from '../../shared/yz-service/entity-api';
import { YzSchemaTable, YzTableStruct, REPORT_ENTITY_NAMES } from '../../shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { ResponseWrapper } from '../../shared';

import { TreeNode, TreeDragDropService } from 'primeng/primeng';
import { SmartReportService, TableField, SelectedTypes } from './smart-report.service';
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
    public renew: boolean = false;

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
                    label: REPORT_ENTITY_NAMES[key] || key,
                    data: key,
                    icon: 'fa-table',
                };
                const children: TreeNode[] = [];

                value.forEach((d) => {
                    const iconChild = this.service.isStringField(d.dataType) ? 'fa-font' :
                        (this.service.isNumberField(d.dataType) ? 'fa-italic' :
                            (this.service.isDateField(d.dataType) ? 'fa-clock-o' : 'fa-columns'));
                    children.push({
                        label: d.description || d.columnName,
                        data: new TableField(key, d.columnName, d.dataType, d.ordinalPosition),
                        icon: iconChild,
                    });
                });

                parent.children = children;
                ret.push(parent);
            }
        });
        return ret;
    }

    private mvNodeBack(node: TreeNode) {
        const treeIdx = this.treeData.findIndex((nd) => {
            return nd.data === (<TableField>node.data).table;
        });
        if (treeIdx === -1) {
            console.warn('error: cannot find parent for node: ', node);
            return;
        }
        const rootNode = this.treeData[treeIdx];
        node.parent = rootNode;
        rootNode.children = [...rootNode.children, node].sort((a, b) => ((<TableField>a.data).position - (<TableField>b.data).position));
    }

    minusClicked(index: SelectedTypes, node: TreeNode) {
        this.service.removeChild(node, index);
        switch (index) {
            case SelectedTypes.NAMES:
                this.selectNames = this.service.selectedNames;
                break;
            case SelectedTypes.VALUES:
                this.selectValues = this.service.selectedValues;
                break;
            default:
                break;
        }
        this.mvNodeBack(node);
    }

    isRoot(node: TreeNode) {
        return node.type === 'root';
    }

    onDrop(i: number, e): void {
        const node: TreeNode = e.dragNode;
        switch (i) {
            case SelectedTypes.NAMES:
                this.service.addChild(node, SelectedTypes.NAMES);
                if (this.service.isNumberNode(node)) {
                    this.toaster.showToast('类型不符', '只有字符型(A)字段才能放到分类轴', ToastType.TYPE_ERROR, ToastPosition.TOP_CENTER);
                    this.minusClicked(SelectedTypes.NAMES, node);
                    break;
                }
                this.selectNames = this.service.selectedNames;
                break;
            case SelectedTypes.VALUES:
                this.service.addChild(node, SelectedTypes.VALUES);
                if (this.service.isStringNode(node)) {
                    this.toaster.showToast('类型不符', '只有数字型(I)字段才能放到数值轴', ToastType.TYPE_ERROR, ToastPosition.TOP_CENTER);
                    this.minusClicked(SelectedTypes.VALUES, node);
                    break;
                }
                this.selectValues = this.service.selectedValues;
                break;
            default:
                break;
        }
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
