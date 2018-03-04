/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CapstoneTestModule } from '../../../test.module';
import { StoreSKUMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/store-sku-my-suffix/store-sku-my-suffix-delete-dialog.component';
import { StoreSKUMySuffixService } from '../../../../../../main/webapp/app/entities/store-sku-my-suffix/store-sku-my-suffix.service';

describe('Component Tests', () => {

    describe('StoreSKUMySuffix Management Delete Component', () => {
        let comp: StoreSKUMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<StoreSKUMySuffixDeleteDialogComponent>;
        let service: StoreSKUMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CapstoneTestModule],
                declarations: [StoreSKUMySuffixDeleteDialogComponent],
                providers: [
                    StoreSKUMySuffixService
                ]
            })
            .overrideTemplate(StoreSKUMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreSKUMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreSKUMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
