/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CapstoneTestModule } from '../../../test.module';
import { StoreSKUMySuffixComponent } from '../../../../../../main/webapp/app/entities/store-sku-my-suffix/store-sku-my-suffix.component';
import { StoreSKUMySuffixService } from '../../../../../../main/webapp/app/entities/store-sku-my-suffix/store-sku-my-suffix.service';
import { StoreSKUMySuffix } from '../../../../../../main/webapp/app/entities/store-sku-my-suffix/store-sku-my-suffix.model';

describe('Component Tests', () => {

    describe('StoreSKUMySuffix Management Component', () => {
        let comp: StoreSKUMySuffixComponent;
        let fixture: ComponentFixture<StoreSKUMySuffixComponent>;
        let service: StoreSKUMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CapstoneTestModule],
                declarations: [StoreSKUMySuffixComponent],
                providers: [
                    StoreSKUMySuffixService
                ]
            })
            .overrideTemplate(StoreSKUMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreSKUMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreSKUMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StoreSKUMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.storeSKUS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
