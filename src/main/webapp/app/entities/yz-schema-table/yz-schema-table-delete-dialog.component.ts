import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { YzSchemaTable } from './yz-schema-table.model';
import { YzSchemaTablePopupService } from './yz-schema-table-popup.service';
import { YzSchemaTableService } from './yz-schema-table.service';

@Component({
    selector: 'jhi-yz-schema-table-delete-dialog',
    templateUrl: './yz-schema-table-delete-dialog.component.html'
})
export class YzSchemaTableDeleteDialogComponent {

    yzSchemaTable: YzSchemaTable;

    constructor(
        private yzSchemaTableService: YzSchemaTableService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.yzSchemaTableService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'yzSchemaTableListModification',
                content: 'Deleted an yzSchemaTable'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-yz-schema-table-delete-popup',
    template: ''
})
export class YzSchemaTableDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private yzSchemaTablePopupService: YzSchemaTablePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.yzSchemaTablePopupService
                .open(YzSchemaTableDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
