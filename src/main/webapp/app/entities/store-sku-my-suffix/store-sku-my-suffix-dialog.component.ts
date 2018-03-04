import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StoreSKUMySuffix } from './store-sku-my-suffix.model';
import { StoreSKUMySuffixPopupService } from './store-sku-my-suffix-popup.service';
import { StoreSKUMySuffixService } from './store-sku-my-suffix.service';
import { StoreMySuffix, StoreMySuffixService } from '../store-my-suffix';
import { SKUMySuffix, SKUMySuffixService } from '../sku-my-suffix';

@Component({
    selector: 'jhi-store-sku-my-suffix-dialog',
    templateUrl: './store-sku-my-suffix-dialog.component.html'
})
export class StoreSKUMySuffixDialogComponent implements OnInit {

    storeSKU: StoreSKUMySuffix;
    isSaving: boolean;

    stores: StoreMySuffix[];

    skus: SKUMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private storeSKUService: StoreSKUMySuffixService,
        private storeService: StoreMySuffixService,
        private sKUService: SKUMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.storeService.query()
            .subscribe((res: HttpResponse<StoreMySuffix[]>) => { this.stores = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.sKUService.query()
            .subscribe((res: HttpResponse<SKUMySuffix[]>) => { this.skus = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.storeSKU.id !== undefined) {
            this.subscribeToSaveResponse(
                this.storeSKUService.update(this.storeSKU));
        } else {
            this.subscribeToSaveResponse(
                this.storeSKUService.create(this.storeSKU));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StoreSKUMySuffix>>) {
        result.subscribe((res: HttpResponse<StoreSKUMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StoreSKUMySuffix) {
        this.eventManager.broadcast({ name: 'storeSKUListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStoreById(index: number, item: StoreMySuffix) {
        return item.id;
    }

    trackSKUById(index: number, item: SKUMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-store-sku-my-suffix-popup',
    template: ''
})
export class StoreSKUMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storeSKUPopupService: StoreSKUMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.storeSKUPopupService
                    .open(StoreSKUMySuffixDialogComponent as Component, params['id']);
            } else {
                this.storeSKUPopupService
                    .open(StoreSKUMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
