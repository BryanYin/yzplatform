import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { YzTableStruct } from './yz-table-struct.model';
import { YzTableStructPopupService } from './yz-table-struct-popup.service';
import { YzTableStructService } from './yz-table-struct.service';

@Component({
    selector: 'jhi-yz-table-struct-dialog',
    templateUrl: './yz-table-struct-dialog.component.html'
})
export class YzTableStructDialogComponent implements OnInit {

    yzTableStruct: YzTableStruct;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private yzTableStructService: YzTableStructService,
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
        if (this.yzTableStruct.id !== undefined) {
            this.subscribeToSaveResponse(
                this.yzTableStructService.update(this.yzTableStruct));
        } else {
            this.subscribeToSaveResponse(
                this.yzTableStructService.create(this.yzTableStruct));
        }
    }

    private subscribeToSaveResponse(result: Observable<YzTableStruct>) {
        result.subscribe((res: YzTableStruct) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: YzTableStruct) {
        this.eventManager.broadcast({ name: 'yzTableStructListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-yz-table-struct-popup',
    template: ''
})
export class YzTableStructPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private yzTableStructPopupService: YzTableStructPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.yzTableStructPopupService
                    .open(YzTableStructDialogComponent as Component, params['id']);
            } else {
                this.yzTableStructPopupService
                    .open(YzTableStructDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
