import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StoreMySuffix } from './store-my-suffix.model';
import { StoreMySuffixPopupService } from './store-my-suffix-popup.service';
import { StoreMySuffixService } from './store-my-suffix.service';

@Component({
    selector: 'jhi-store-my-suffix-delete-dialog',
    templateUrl: './store-my-suffix-delete-dialog.component.html'
})
export class StoreMySuffixDeleteDialogComponent {

    store: StoreMySuffix;

    constructor(
        private storeService: StoreMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.storeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'storeListModification',
                content: 'Deleted an store'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-store-my-suffix-delete-popup',
    template: ''
})
export class StoreMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storePopupService: StoreMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.storePopupService
                .open(StoreMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
