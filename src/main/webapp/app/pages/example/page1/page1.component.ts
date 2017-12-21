import { Component, OnInit } from '@angular/core';
import { Page1Service } from './page1.service';
import { Grade } from '../../../shared/interfaces';
import * as _ from 'lodash';

@Component({
    selector: 'yz-example-page1',
    templateUrl: 'page1.component.html',
})
export class Page1Component implements OnInit {

    public gradeRecords: Array<Grade>;
    public selectedRow: Grade;
    public dialogGrade: Grade;
    public displayDialog = false;

    private _isAddingNew = false;

    public titleRow1 = [
        { name: '杠杆比率', index: 1 },
        { name: '利率因素', index: 2 },
        { name: '现金流动性', index: 3 },
        { name: '创收能力', index: 4 },
        { name: '盈利能力', index: 5 },
        { name: '客户评级', index: 6 },
    ];
    public titleRow2 = [
        { field: 'ggbl', name: '净借款/EBITDA', index: 1 },
        { field: 'llys', name: '国际市场筹资成本', index: 2 },
        { field: 'xjldx', name: 'EBITDA MARGIN', index: 3 },
        { field: 'csnl', name: '销售收入', index: 4 },
        { field: 'ylnl', name: '净利润/收入', index: 5 },
        { field: 'khpj', name: '内部评级', index: 6 },
    ];

    constructor(private service: Page1Service) { }

    ngOnInit() {
        this.service.getInitData().subscribe(
            (data) => this.gradeRecords = data
        );
    }

    showDialogToAdd() {
        this._isAddingNew = true;
        this.dialogGrade = new Grade('', 0, 0, 0, 0, 0, 0);
        this.displayDialog = true;
    }

    onRowSelect(row) {
        this._isAddingNew = false;
        this.dialogGrade = _.clone(row.data);
        this.displayDialog = true;
    }
    mouseOver(e) {
        console.log(e);
    }

    save() {
        const grades = [...this.gradeRecords];
        if (this._isAddingNew) {
            grades.push(this.dialogGrade);
        } else {
            grades[this.findSelectedGradeIndex()] = this.dialogGrade;
        }

        this.gradeRecords = grades;
        this.dialogGrade = null;
        this.displayDialog = false;
    }

    delete() {
        const index = this.findSelectedGradeIndex();
        this.gradeRecords = this.gradeRecords.filter((val, i) => i !== index);
        this.dialogGrade = null;
        this.displayDialog = false;
    }
    findSelectedGradeIndex(): number {
        return this.gradeRecords.indexOf(this.selectedRow);
    }
}
