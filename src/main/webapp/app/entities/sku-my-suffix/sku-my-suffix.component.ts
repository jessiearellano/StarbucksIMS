import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SKUMySuffix } from './sku-my-suffix.model';
import { SKUMySuffixService } from './sku-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-sku-my-suffix',
    templateUrl: './sku-my-suffix.component.html'
})
export class SKUMySuffixComponent implements OnInit, OnDestroy {
sKUS: SKUMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sKUService: SKUMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.sKUService.query().subscribe(
            (res: HttpResponse<SKUMySuffix[]>) => {
                this.sKUS = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSKUS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SKUMySuffix) {
        return item.id;
    }
    registerChangeInSKUS() {
        this.eventSubscriber = this.eventManager.subscribe('sKUListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
