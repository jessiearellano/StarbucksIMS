import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StoreSKUMySuffix } from './store-sku-my-suffix.model';
import { StoreSKUMySuffixService } from './store-sku-my-suffix.service';

@Component({
    selector: 'jhi-store-sku-my-suffix-detail',
    templateUrl: './store-sku-my-suffix-detail.component.html'
})
export class StoreSKUMySuffixDetailComponent implements OnInit, OnDestroy {

    storeSKU: StoreSKUMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private storeSKUService: StoreSKUMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStoreSKUS();
    }

    load(id) {
        this.storeSKUService.find(id)
            .subscribe((storeSKUResponse: HttpResponse<StoreSKUMySuffix>) => {
                this.storeSKU = storeSKUResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStoreSKUS() {
        this.eventSubscriber = this.eventManager.subscribe(
            'storeSKUListModification',
            (response) => this.load(this.storeSKU.id)
        );
    }
}
