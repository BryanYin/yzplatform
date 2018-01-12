import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { YzSchemaTable } from './yz-schema-table.model';
import { YzSchemaTablePopupService } from './yz-schema-table-popup.service';
import { YzSchemaTableService } from './yz-schema-table.service';

@Component({
    selector: 'jhi-yz-schema-table-dialog',
    templateUrl: './yz-schema-table-dialog.component.html'
})
export class YzSchemaTableDialogComponent implements OnInit {

    yzSchemaTable: YzSchemaTable;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private yzSchemaTableService: YzSchemaTableService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.yzSchemaTable.id !== undefined) {
            this.subscribeToSaveResponse(
                this.yzSchemaTableService.update(this.yzSchemaTable));
        } else {
            this.subscribeToSaveResponse(
                this.yzSchemaTableService.create(this.yzSchemaTable));
        }
    }

    private subscribeToSaveResponse(result: Observable<YzSchemaTable>) {
        result.subscribe((res: YzSchemaTable) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: YzSchemaTable) {
        this.eventManager.broadcast({ name: 'yzSchemaTableListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-yz-schema-table-popup',
    template: ''
})
export class YzSchemaTablePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private yzSchemaTablePopupService: YzSchemaTablePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.yzSchemaTablePopupService
                    .open(YzSchemaTableDialogComponent as Component, params['id']);
            } else {
                this.yzSchemaTablePopupService
                    .open(YzSchemaTableDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
