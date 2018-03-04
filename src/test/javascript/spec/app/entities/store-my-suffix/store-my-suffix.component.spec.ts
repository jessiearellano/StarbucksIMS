/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CapstoneTestModule } from '../../../test.module';
import { StoreMySuffixComponent } from '../../../../../../main/webapp/app/entities/store-my-suffix/store-my-suffix.component';
import { StoreMySuffixService } from '../../../../../../main/webapp/app/entities/store-my-suffix/store-my-suffix.service';
import { StoreMySuffix } from '../../../../../../main/webapp/app/entities/store-my-suffix/store-my-suffix.model';

describe('Component Tests', () => {

    describe('StoreMySuffix Management Component', () => {
        let comp: StoreMySuffixComponent;
        let fixture: ComponentFixture<StoreMySuffixComponent>;
        let service: StoreMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CapstoneTestModule],
                declarations: [StoreMySuffixComponent],
                providers: [
                    StoreMySuffixService
                ]
            })
            .overrideTemplate(StoreMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StoreMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stores[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
