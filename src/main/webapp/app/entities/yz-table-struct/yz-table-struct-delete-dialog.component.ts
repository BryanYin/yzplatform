import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { YzTableStruct } from './yz-table-struct.model';
import { YzTableStructPopupService } from './yz-table-struct-popup.service';
import { YzTableStructService } from './yz-table-struct.service';

@Component({
    selector: 'jhi-yz-table-struct-delete-dialog',
    templateUrl: './yz-table-struct-delete-dialog.component.html'
})
export class YzTableStructDeleteDialogComponent {

    yzTableStruct: YzTableStruct;

    constructor(
        private yzTableStructService: YzTableStructService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.yzTableStructService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'yzTableStructListModification',
                content: 'Deleted an yzTableStruct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-yz-table-struct-delete-popup',
    template: ''
})
export class YzTableStructDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private yzTableStructPopupService: YzTableStructPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.yzTableStructPopupService
                .open(YzTableStructDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
