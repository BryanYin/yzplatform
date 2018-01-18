import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import * as _ from 'lodash';

@Injectable()
export class SmartReportService {
    private _selectedNames: TreeNode[] = [
        {
            label: '分类轴',
            data: 'Backup Folder',
            expandedIcon: 'fa-minus',
            collapsedIcon: 'fa-plus',
            expanded: true,
        }
    ];

    private _selectedValues: TreeNode[] = [
        {
            label: '数值轴',
            data: 'Backup Folder',
            expandedIcon: 'fa-minus',
            collapsedIcon: 'fa-plus',
            expanded: true,
        }
    ];

    get selectedNames() {
        return _.cloneDeep(this._selectedNames);
    }

    get selectedValues() {
        return _.cloneDeep(this._selectedValues);
    }

    constructor() { }

    public addSelectedName(name: TreeNode) {
        this._selectedNames = this.addChild(this._selectedNames, name);
    }

    public addSelectedValue(value: TreeNode) {
        this._selectedValues = this.addChild(this._selectedValues, value);
    }

    private addChild(nodes: TreeNode[], child: TreeNode): TreeNode[] {
        const copyNodes: TreeNode[] = _.cloneDeep(nodes);
        const copyChild: TreeNode = _.cloneDeep(child);
        if (copyChild.parent) {
            copyChild.parent = null;
        }
        copyChild.expanded = true;
        if (copyNodes.length > 0) {
            if (copyNodes[0].children) {
                copyNodes[0].children.push(copyChild);
            } else {
                copyNodes[0].children = [child];
            }
        }
        return copyNodes;
    }
}
