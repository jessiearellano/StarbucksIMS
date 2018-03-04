import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StoreMySuffix } from './store-my-suffix.model';
import { StoreMySuffixService } from './store-my-suffix.service';

@Component({
    selector: 'jhi-store-my-suffix-detail',
    templateUrl: './store-my-suffix-detail.component.html'
})
export class StoreMySuffixDetailComponent implements OnInit, OnDestroy {

    store: StoreMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private storeService: StoreMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStores();
    }

    load(id) {
        this.storeService.find(id)
            .subscribe((storeResponse: HttpResponse<StoreMySuffix>) => {
                this.store = storeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStores() {
        this.eventSubscriber = this.eventManager.subscribe(
            'storeListModification',
            (response) => this.load(this.store.id)
        );
    }
}
