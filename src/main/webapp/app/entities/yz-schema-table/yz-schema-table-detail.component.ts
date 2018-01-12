import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { YzSchemaTable } from './yz-schema-table.model';
import { YzSchemaTableService } from './yz-schema-table.service';

@Component({
    selector: 'jhi-yz-schema-table-detail',
    templateUrl: './yz-schema-table-detail.component.html'
})
export class YzSchemaTableDetailComponent implements OnInit, OnDestroy {

    yzSchemaTable: YzSchemaTable;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private yzSchemaTableService: YzSchemaTableService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInYzSchemaTables();
    }

    load(id) {
        this.yzSchemaTableService.find(id).subscribe((yzSchemaTable) => {
            this.yzSchemaTable = yzSchemaTable;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInYzSchemaTables() {
        this.eventSubscriber = this.eventManager.subscribe(
            'yzSchemaTableListModification',
            (response) => this.load(this.yzSchemaTable.id)
        );
    }
}
