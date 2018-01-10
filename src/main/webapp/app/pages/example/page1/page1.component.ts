import { Component, OnInit } from '@angular/core';
import { Page1Service } from './page1.service';
import { EntityApiService, ENTITY_ENDPOINT } from '../../../shared/yz-service/entity-api.service';
import { Grade } from '../../../shared/interfaces';
import * as _ from 'lodash';

@Component({
    selector: 'yz-example-page1',
    templateUrl: 'page1.component.html',
    providers: [
        EntityApiService,
        {provide: ENTITY_ENDPOINT, useValue: 'api/grades'}
    ],
})
export class Page1Component implements OnInit {

    public gradeRecords: Array<Grade>;
    public selectedRow: Grade;
    public dialogGrade: Grade;
    public displayDialog = false;

    private _isAddingNew = false;

    public titleRow1: any;
    public titleRow2: any;

    constructor(private service: Page1Service, private api: EntityApiService) {
        this.titleRow1 = Grade.titleRow1;
        this.titleRow2 = Grade.titleRow2;
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
        this.gradeRecords = this.gradeRecords.filter((val, i) => i !== index);
        this.api.delete(this.gradeRecords[index].id).subscribe();
        this.dialogGrade = null;
        this.displayDialog = false;
    }
    findSelectedGradeIndex(): number {
        return this.gradeRecords.indexOf(this.selectedRow);
    }
}
