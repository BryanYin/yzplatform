import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { YzTableStruct } from './yz-table-struct.model';
import { YzTableStructService } from './yz-table-struct.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-yz-table-struct',
    templateUrl: './yz-table-struct.component.html'
})
export class YzTableStructComponent implements OnInit, OnDestroy {
yzTableStructs: YzTableStruct[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private yzTableStructService: YzTableStructService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.yzTableStructService.query().subscribe(
            (res: ResponseWrapper) => {
                this.yzTableStructs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInYzTableStructs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: YzTableStruct) {
        return item.id;
    }
    registerChangeInYzTableStructs() {
        this.eventSubscriber = this.eventManager.subscribe('yzTableStructListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
