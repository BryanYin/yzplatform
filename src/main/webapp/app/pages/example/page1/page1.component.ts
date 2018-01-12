import { Component, OnInit, Injector } from '@angular/core';
import { Page1Service } from './page1.service';
import { HttpClient } from '@angular/common/http';
import { EntityApiService } from '../../../shared/yz-service/entity-api';
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

    public titleRow1: any;
    public titleRow2: any;

    private api;

    constructor(private service: Page1Service, private injector: Injector) {
        this.titleRow1 = Grade.titleRow1;
        this.titleRow2 = Grade.titleRow2;
        this.api = new EntityApiService<Grade>(this.injector.get(HttpClient), new Grade());
    }

    ngOnInit() {
        this.service.getInitData().subscribe(
            (data) => {
                this.gradeRecords = data;
            });
    }

    showDialogToAdd() {
        this._isAddingNew = true;
        this.dialogGrade = new Grade('', 0, 0, 0, 0, 0, 0, 0, '', '');
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
            this.api.create(this.dialogGrade).subscribe();
        } else {
            grades[this.findSelectedGradeIndex()] = this.dialogGrade;
            this.api.update(this.dialogGrade).subscribe();
        }

        this.gradeRecords = grades;
        this.dialogGrade = null;
        this.displayDialog = false;
    }

    delete() {
        const index = this.findSelectedGradeIndex();
        const id = this.gradeRecords[index].id;
        this.gradeRecords = this.gradeRecords.filter((val, i) => i !== index);
        this.api.delete(id).subscribe();
        this.dialogGrade = null;
        this.displayDialog = false;
    }
    findSelectedGradeIndex(): number {
        return this.gradeRecords.indexOf(this.selectedRow);
    }
}
