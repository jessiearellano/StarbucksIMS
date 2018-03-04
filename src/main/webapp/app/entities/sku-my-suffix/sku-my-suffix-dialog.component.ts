import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SKUMySuffix } from './sku-my-suffix.model';
import { SKUMySuffixPopupService } from './sku-my-suffix-popup.service';
import { SKUMySuffixService } from './sku-my-suffix.service';

@Component({
    selector: 'jhi-sku-my-suffix-dialog',
    templateUrl: './sku-my-suffix-dialog.component.html'
})
export class SKUMySuffixDialogComponent implements OnInit {

    sKU: SKUMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private sKUService: SKUMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sKU.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sKUService.update(this.sKU));
        } else {
            this.subscribeToSaveResponse(
                this.sKUService.create(this.sKU));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SKUMySuffix>>) {
        result.subscribe((res: HttpResponse<SKUMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SKUMySuffix) {
        this.eventManager.broadcast({ name: 'sKUListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-sku-my-suffix-popup',
    template: ''
})
export class SKUMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sKUPopupService: SKUMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sKUPopupService
                    .open(SKUMySuffixDialogComponent as Component, params['id']);
            } else {
                this.sKUPopupService
                    .open(SKUMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
