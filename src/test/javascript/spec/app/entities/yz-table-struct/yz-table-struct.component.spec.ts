/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { CdbGradeTestModule } from '../../../test.module';
import { YzTableStructComponent } from '../../../../../../main/webapp/app/entities/yz-table-struct/yz-table-struct.component';
import { YzTableStructService } from '../../../../../../main/webapp/app/entities/yz-table-struct/yz-table-struct.service';
import { YzTableStruct } from '../../../../../../main/webapp/app/entities/yz-table-struct/yz-table-struct.model';

describe('Component Tests', () => {

    describe('YzTableStruct Management Component', () => {
        let comp: YzTableStructComponent;
        let fixture: ComponentFixture<YzTableStructComponent>;
        let service: YzTableStructService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CdbGradeTestModule],
                declarations: [YzTableStructComponent],
                providers: [
                    YzTableStructService
                ]
            })
            .overrideTemplate(YzTableStructComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(YzTableStructComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YzTableStructService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new YzTableStruct(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.yzTableStructs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
