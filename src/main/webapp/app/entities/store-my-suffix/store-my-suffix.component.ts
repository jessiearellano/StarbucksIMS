import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StoreMySuffix } from './store-my-suffix.model';
import { StoreMySuffixService } from './store-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-store-my-suffix',
    templateUrl: './store-my-suffix.component.html'
})
export class StoreMySuffixComponent implements OnInit, OnDestroy {
stores: StoreMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private storeService: StoreMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.storeService.query().subscribe(
            (res: HttpResponse<StoreMySuffix[]>) => {
                this.stores = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInStores();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: StoreMySuffix) {
        return item.id;
    }
    registerChangeInStores() {
        this.eventSubscriber = this.eventManager.subscribe('storeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
