/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { CdbGradeTestModule } from '../../../test.module';
import { YzTableStructDetailComponent } from '../../../../../../main/webapp/app/entities/yz-table-struct/yz-table-struct-detail.component';
import { YzTableStructService } from '../../../../../../main/webapp/app/entities/yz-table-struct/yz-table-struct.service';
import { YzTableStruct } from '../../../../../../main/webapp/app/entities/yz-table-struct/yz-table-struct.model';

describe('Component Tests', () => {

    describe('YzTableStruct Management Detail Component', () => {
        let comp: YzTableStructDetailComponent;
        let fixture: ComponentFixture<YzTableStructDetailComponent>;
        let service: YzTableStructService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CdbGradeTestModule],
                declarations: [YzTableStructDetailComponent],
                providers: [
                    YzTableStructService
                ]
            })
            .overrideTemplate(YzTableStructDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(YzTableStructDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YzTableStructService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new YzTableStruct(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.yzTableStruct).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
