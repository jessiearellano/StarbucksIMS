import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { StoreSKUMySuffix } from './store-sku-my-suffix.model';
import { StoreSKUMySuffixService } from './store-sku-my-suffix.service';

@Injectable()
export class StoreSKUMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private storeSKUService: StoreSKUMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.storeSKUService.find(id)
                    .subscribe((storeSKUResponse: HttpResponse<StoreSKUMySuffix>) => {
                        const storeSKU: StoreSKUMySuffix = storeSKUResponse.body;
                        this.ngbModalRef = this.storeSKUModalRef(component, storeSKU);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.storeSKUModalRef(component, new StoreSKUMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    storeSKUModalRef(component: Component, storeSKU: StoreSKUMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.storeSKU = storeSKU;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
