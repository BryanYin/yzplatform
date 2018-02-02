import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import {
    YzSchemaTable,
    YzTableStruct,
    Entity
} from '../../shared/interfaces';
import { Observable } from 'rxjs';
import { YzToastService, ToastType, ToastPosition, ToastAnimation } from '../../shared/yz-service/yz-toast.service';

export class TableField {
    constructor(
        public table: string,
        public field: string,
        public fieldType: string,
        public position: number) { }
}

export enum SelectedTypes {
    NAMES = 1,
    VALUES = 2
}

@Injectable()
export class SmartReportService {

    private endpoint = 'api/entity/';

    private REGISTERED_ENTITY: any = {
        'yz_schema_table': new YzSchemaTable(),
        'yz_table_struct': new YzTableStruct(),
    };

    private _selectedNames: TreeNode[] = [
        {
            label: '分类轴',
            data: 'Backup Folder',
            expandedIcon: 'fa-minus',
            collapsedIcon: 'fa-plus',
            expanded: true,
            children: null,
            type: 'root',
        }
    ];

    private _selectedValues: TreeNode[] = [
        {
            label: '数值轴',
            data: 'Backup Folder',
            expandedIcon: 'fa-minus',
            collapsedIcon: 'fa-plus',
            expanded: true,
            children: null,
            type: 'root',
        }
    ];

    get selectedNames(): TreeNode[] {
        return _.cloneDeep(this._selectedNames);
    }

    get selectedValues(): TreeNode[] {
        return _.cloneDeep(this._selectedValues);
    }

    private tableData: Map<string, any> = new Map();
    private names: Map<string, Array<string>> = new Map();
    private values: Map<string, Array<number>> = new Map();

    constructor(private http: HttpClient, private toaster: YzToastService) { }

    public registerEntity(name: string, entity: Entity) {
        this.REGISTERED_ENTITY[name] = entity;
    }

    public constructData(renew: boolean): Observable<Map<string, Array<any>>> {
        let tables: string[] = this._selectedNames[0].children.map((n) => n.data.table)
            .concat(this._selectedValues[0].children.map((v) => v.data.table));

        if (!tables) {
            return;
        } else {
            tables = (<string[]>_.uniq(tables)).filter((t) => renew || !this.tableData.has(t));
        }
        // console.log('table', tables);
        if (tables.length > 0) {
            return Observable.combineLatest(...tables.map((tb) => this.http.get(this.endpoint + tb))).map((data) => {
                for (let i = 0; i < data.length && i < tables.length; ++i) {
                    if (!data[i]) {
                        this.toaster.showToast('没有取到数据', '表' + tables[i] + '没有数据',
                            ToastType.TYPE_ERROR, ToastPosition.CENTER, ToastAnimation.SLIDE_DOWN);
                        continue;
                    }
                    this.tableData.set(tables[i], data[i]);
                }
                return this.getDataArray();
            });
        } else {
            return Observable.of(this.getDataArray());
        }
    }

    private getDataArray(): Map<string, Array<any>> {
        const dataNamesColumns = this._selectedNames[0].children
            .filter((c) => this.isStringNode(c)).map((c) => c.data);
        if (dataNamesColumns.length === 0) {
            this.toaster.showToast('分类轴没有选择字符字段', '分类轴必须要选择字符字段', ToastType.TYPE_WARNING, ToastPosition.CENTER);
            return null;
        }

        const dataValuesColumns = this.selectedValues[0].children
            .filter((c) => this.isNumberNode(c)).map((c) => c.data);
        if (dataValuesColumns.length === 0) {
            this.toaster.showToast('数值轴没有选择数值字段', '数值轴必须要选择数值字段', ToastType.TYPE_WARNING, ToastPosition.CENTER);
            return null;
        }

        const retMap: Map<string, Array<any>> = new Map();

        for (let i = 0; i < dataNamesColumns.length; i++) {
            const name = dataNamesColumns[i];
            const tableData = this.tableData.get((<TableField>name).table);
            if (tableData) {
                retMap.set('x' + i, tableData.map((td) => td[(<TableField>name).field]));
            }
        }

        for (let i = 0; i < dataValuesColumns.length; i++) {
            const value = dataValuesColumns[i];
            const tableData = this.tableData.get((<TableField>value).table);
            if (tableData) {
                retMap.set('y' + i, tableData.map((td) => td[(<TableField>value).field]));
            }
        }
        // console.log('retMap', retMap);
        return retMap;
    }

    public addChild(child: TreeNode, type: SelectedTypes) {
        let target: TreeNode[];
        switch (type) {
            case SelectedTypes.NAMES:
                target = this._selectedNames;
                break;
            case SelectedTypes.VALUES:
                target = this._selectedValues;
                break;
            default:
                break;
        }
        if (!target) {
            return;
        }
        if (child.parent) {
            child.parent = null;
        }
        child.expanded = true;
        if (target.length > 0) {
            if (target[0].children) {
                target[0].children.push(child);
            } else {
                target[0].children = [child];
            }
        }
    }

    public removeChild(node: TreeNode, type: SelectedTypes) {
        let target: TreeNode[];
        switch (type) {
            case SelectedTypes.NAMES:
                target = this._selectedNames;
                break;
            case SelectedTypes.VALUES:
                target = this._selectedValues;
                break;
            default:
                break;
        }
        if (!target) {
            return;
        }

        const idx = target[0].children.findIndex((nd) => nd.label === node.label);
        if (idx === -1) {
            return;
        }
        target[0].children.splice(idx, 1);
    }

    public isStringField(field: string) {
        return field.toLowerCase().includes('char');
    }

    public isNumberField(field: string) {
        return field.toLowerCase().includes('int');
    }

    public isDateField(field: string) {
        return field.toLowerCase().includes('time') || field.toLowerCase().includes('date');
    }

    public isStringNode(node: TreeNode): boolean {
        return this.isStringField(node.data.fieldType);
    }

    public isNumberNode(node: TreeNode): boolean {
        return this.isNumberField(node.data.fieldType);
    }

    public isDateNode(node: TreeNode): boolean {
        return this.isDateField(node.data.fieldType);
    }
}
