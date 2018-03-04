import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SKUMySuffix } from './sku-my-suffix.model';
import { SKUMySuffixPopupService } from './sku-my-suffix-popup.service';
import { SKUMySuffixService } from './sku-my-suffix.service';

@Component({
    selector: 'jhi-sku-my-suffix-delete-dialog',
    templateUrl: './sku-my-suffix-delete-dialog.component.html'
})
export class SKUMySuffixDeleteDialogComponent {

    sKU: SKUMySuffix;

    constructor(
        private sKUService: SKUMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sKUService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sKUListModification',
                content: 'Deleted an sKU'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sku-my-suffix-delete-popup',
    template: ''
})
export class SKUMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sKUPopupService: SKUMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sKUPopupService
                .open(SKUMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
