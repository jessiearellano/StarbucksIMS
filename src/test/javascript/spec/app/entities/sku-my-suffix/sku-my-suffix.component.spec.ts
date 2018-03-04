/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CapstoneTestModule } from '../../../test.module';
import { SKUMySuffixComponent } from '../../../../../../main/webapp/app/entities/sku-my-suffix/sku-my-suffix.component';
import { SKUMySuffixService } from '../../../../../../main/webapp/app/entities/sku-my-suffix/sku-my-suffix.service';
import { SKUMySuffix } from '../../../../../../main/webapp/app/entities/sku-my-suffix/sku-my-suffix.model';

describe('Component Tests', () => {

    describe('SKUMySuffix Management Component', () => {
        let comp: SKUMySuffixComponent;
        let fixture: ComponentFixture<SKUMySuffixComponent>;
        let service: SKUMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CapstoneTestModule],
                declarations: [SKUMySuffixComponent],
                providers: [
                    SKUMySuffixService
                ]
            })
            .overrideTemplate(SKUMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SKUMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SKUMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SKUMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sKUS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
