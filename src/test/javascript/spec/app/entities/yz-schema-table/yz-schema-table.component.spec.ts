/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { CdbGradeTestModule } from '../../../test.module';
import { YzSchemaTableComponent } from '../../../../../../main/webapp/app/entities/yz-schema-table/yz-schema-table.component';
import { YzSchemaTableService } from '../../../../../../main/webapp/app/entities/yz-schema-table/yz-schema-table.service';
import { YzSchemaTable } from '../../../../../../main/webapp/app/entities/yz-schema-table/yz-schema-table.model';

describe('Component Tests', () => {

    describe('YzSchemaTable Management Component', () => {
        let comp: YzSchemaTableComponent;
        let fixture: ComponentFixture<YzSchemaTableComponent>;
        let service: YzSchemaTableService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CdbGradeTestModule],
                declarations: [YzSchemaTableComponent],
                providers: [
                    YzSchemaTableService
                ]
            })
            .overrideTemplate(YzSchemaTableComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(YzSchemaTableComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YzSchemaTableService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new YzSchemaTable(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.yzSchemaTables[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
