/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CapstoneTestModule } from '../../../test.module';
import { StoreSKUMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/store-sku-my-suffix/store-sku-my-suffix-detail.component';
import { StoreSKUMySuffixService } from '../../../../../../main/webapp/app/entities/store-sku-my-suffix/store-sku-my-suffix.service';
import { StoreSKUMySuffix } from '../../../../../../main/webapp/app/entities/store-sku-my-suffix/store-sku-my-suffix.model';

describe('Component Tests', () => {

    describe('StoreSKUMySuffix Management Detail Component', () => {
        let comp: StoreSKUMySuffixDetailComponent;
        let fixture: ComponentFixture<StoreSKUMySuffixDetailComponent>;
        let service: StoreSKUMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CapstoneTestModule],
                declarations: [StoreSKUMySuffixDetailComponent],
                providers: [
                    StoreSKUMySuffixService
                ]
            })
            .overrideTemplate(StoreSKUMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreSKUMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreSKUMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StoreSKUMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.storeSKU).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
