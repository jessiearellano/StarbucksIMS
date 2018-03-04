import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SKUMySuffix } from './sku-my-suffix.model';
import { SKUMySuffixService } from './sku-my-suffix.service';

@Component({
    selector: 'jhi-sku-my-suffix-detail',
    templateUrl: './sku-my-suffix-detail.component.html'
})
export class SKUMySuffixDetailComponent implements OnInit, OnDestroy {

    sKU: SKUMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sKUService: SKUMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSKUS();
    }

    load(id) {
        this.sKUService.find(id)
            .subscribe((sKUResponse: HttpResponse<SKUMySuffix>) => {
                this.sKU = sKUResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSKUS() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sKUListModification',
            (response) => this.load(this.sKU.id)
        );
    }
}
