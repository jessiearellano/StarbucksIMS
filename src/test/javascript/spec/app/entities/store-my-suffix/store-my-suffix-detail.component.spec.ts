/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CapstoneTestModule } from '../../../test.module';
import { StoreMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/store-my-suffix/store-my-suffix-detail.component';
import { StoreMySuffixService } from '../../../../../../main/webapp/app/entities/store-my-suffix/store-my-suffix.service';
import { StoreMySuffix } from '../../../../../../main/webapp/app/entities/store-my-suffix/store-my-suffix.model';

describe('Component Tests', () => {

    describe('StoreMySuffix Management Detail Component', () => {
        let comp: StoreMySuffixDetailComponent;
        let fixture: ComponentFixture<StoreMySuffixDetailComponent>;
        let service: StoreMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CapstoneTestModule],
                declarations: [StoreMySuffixDetailComponent],
                providers: [
                    StoreMySuffixService
                ]
            })
            .overrideTemplate(StoreMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StoreMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.store).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
