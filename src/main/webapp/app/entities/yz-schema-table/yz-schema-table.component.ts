import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { YzSchemaTable } from './yz-schema-table.model';
import { YzSchemaTableService } from './yz-schema-table.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-yz-schema-table',
    templateUrl: './yz-schema-table.component.html'
})
export class YzSchemaTableComponent implements OnInit, OnDestroy {
yzSchemaTables: YzSchemaTable[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private yzSchemaTableService: YzSchemaTableService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.yzSchemaTableService.query().subscribe(
            (res: ResponseWrapper) => {
                this.yzSchemaTables = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInYzSchemaTables();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: YzSchemaTable) {
        return item.id;
    }
    registerChangeInYzSchemaTables() {
        this.eventSubscriber = this.eventManager.subscribe('yzSchemaTableListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
