/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { CdbGradeTestModule } from '../../../test.module';
import { YzSchemaTableDetailComponent } from '../../../../../../main/webapp/app/entities/yz-schema-table/yz-schema-table-detail.component';
import { YzSchemaTableService } from '../../../../../../main/webapp/app/entities/yz-schema-table/yz-schema-table.service';
import { YzSchemaTable } from '../../../../../../main/webapp/app/entities/yz-schema-table/yz-schema-table.model';

describe('Component Tests', () => {

    describe('YzSchemaTable Management Detail Component', () => {
        let comp: YzSchemaTableDetailComponent;
        let fixture: ComponentFixture<YzSchemaTableDetailComponent>;
        let service: YzSchemaTableService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CdbGradeTestModule],
                declarations: [YzSchemaTableDetailComponent],
                providers: [
                    YzSchemaTableService
                ]
            })
            .overrideTemplate(YzSchemaTableDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(YzSchemaTableDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YzSchemaTableService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new YzSchemaTable(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.yzSchemaTable).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
