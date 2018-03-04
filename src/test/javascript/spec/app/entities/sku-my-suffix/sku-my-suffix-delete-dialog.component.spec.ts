/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CapstoneTestModule } from '../../../test.module';
import { SKUMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/sku-my-suffix/sku-my-suffix-delete-dialog.component';
import { SKUMySuffixService } from '../../../../../../main/webapp/app/entities/sku-my-suffix/sku-my-suffix.service';

describe('Component Tests', () => {

    describe('SKUMySuffix Management Delete Component', () => {
        let comp: SKUMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SKUMySuffixDeleteDialogComponent>;
        let service: SKUMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CapstoneTestModule],
                declarations: [SKUMySuffixDeleteDialogComponent],
                providers: [
                    SKUMySuffixService
                ]
            })
            .overrideTemplate(SKUMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SKUMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SKUMySuffixService);
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
