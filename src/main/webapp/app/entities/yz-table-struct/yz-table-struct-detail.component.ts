import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { YzTableStruct } from './yz-table-struct.model';
import { YzTableStructService } from './yz-table-struct.service';

@Component({
    selector: 'jhi-yz-table-struct-detail',
    templateUrl: './yz-table-struct-detail.component.html'
})
export class YzTableStructDetailComponent implements OnInit, OnDestroy {

    yzTableStruct: YzTableStruct;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private yzTableStructService: YzTableStructService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInYzTableStructs();
    }

    load(id) {
        this.yzTableStructService.find(id).subscribe((yzTableStruct) => {
            this.yzTableStruct = yzTableStruct;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInYzTableStructs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'yzTableStructListModification',
            (response) => this.load(this.yzTableStruct.id)
        );
    }
}
