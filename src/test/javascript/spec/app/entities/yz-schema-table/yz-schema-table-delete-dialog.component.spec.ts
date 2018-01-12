/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CdbGradeTestModule } from '../../../test.module';
import { YzSchemaTableDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/yz-schema-table/yz-schema-table-delete-dialog.component';
import { YzSchemaTableService } from '../../../../../../main/webapp/app/entities/yz-schema-table/yz-schema-table.service';

describe('Component Tests', () => {

    describe('YzSchemaTable Management Delete Component', () => {
        let comp: YzSchemaTableDeleteDialogComponent;
        let fixture: ComponentFixture<YzSchemaTableDeleteDialogComponent>;
        let service: YzSchemaTableService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CdbGradeTestModule],
                declarations: [YzSchemaTableDeleteDialogComponent],
                providers: [
                    YzSchemaTableService
                ]
            })
            .overrideTemplate(YzSchemaTableDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(YzSchemaTableDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YzSchemaTableService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
