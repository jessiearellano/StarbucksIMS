/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CapstoneTestModule } from '../../../test.module';
import { StoreMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/store-my-suffix/store-my-suffix-delete-dialog.component';
import { StoreMySuffixService } from '../../../../../../main/webapp/app/entities/store-my-suffix/store-my-suffix.service';

describe('Component Tests', () => {

    describe('StoreMySuffix Management Delete Component', () => {
        let comp: StoreMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<StoreMySuffixDeleteDialogComponent>;
        let service: StoreMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CapstoneTestModule],
                declarations: [StoreMySuffixDeleteDialogComponent],
                providers: [
                    StoreMySuffixService
                ]
            })
            .overrideTemplate(StoreMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreMySuffixService);
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
