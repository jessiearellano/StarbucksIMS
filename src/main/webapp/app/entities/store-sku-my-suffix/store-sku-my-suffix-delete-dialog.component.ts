import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StoreSKUMySuffix } from './store-sku-my-suffix.model';
import { StoreSKUMySuffixPopupService } from './store-sku-my-suffix-popup.service';
import { StoreSKUMySuffixService } from './store-sku-my-suffix.service';

@Component({
    selector: 'jhi-store-sku-my-suffix-delete-dialog',
    templateUrl: './store-sku-my-suffix-delete-dialog.component.html'
})
export class StoreSKUMySuffixDeleteDialogComponent {

    storeSKU: StoreSKUMySuffix;

    constructor(
        private storeSKUService: StoreSKUMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.storeSKUService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'storeSKUListModification',
                content: 'Deleted an storeSKU'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-store-sku-my-suffix-delete-popup',
    template: ''
})
export class StoreSKUMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storeSKUPopupService: StoreSKUMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.storeSKUPopupService
                .open(StoreSKUMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
