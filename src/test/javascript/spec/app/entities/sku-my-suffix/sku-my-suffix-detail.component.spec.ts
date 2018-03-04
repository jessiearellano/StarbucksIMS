/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CapstoneTestModule } from '../../../test.module';
import { SKUMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/sku-my-suffix/sku-my-suffix-detail.component';
import { SKUMySuffixService } from '../../../../../../main/webapp/app/entities/sku-my-suffix/sku-my-suffix.service';
import { SKUMySuffix } from '../../../../../../main/webapp/app/entities/sku-my-suffix/sku-my-suffix.model';

describe('Component Tests', () => {

    describe('SKUMySuffix Management Detail Component', () => {
        let comp: SKUMySuffixDetailComponent;
        let fixture: ComponentFixture<SKUMySuffixDetailComponent>;
        let service: SKUMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CapstoneTestModule],
                declarations: [SKUMySuffixDetailComponent],
                providers: [
                    SKUMySuffixService
                ]
            })
            .overrideTemplate(SKUMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SKUMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SKUMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SKUMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sKU).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
