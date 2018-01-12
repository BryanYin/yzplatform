/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CdbGradeTestModule } from '../../../test.module';
import { YzTableStructDialogComponent } from '../../../../../../main/webapp/app/entities/yz-table-struct/yz-table-struct-dialog.component';
import { YzTableStructService } from '../../../../../../main/webapp/app/entities/yz-table-struct/yz-table-struct.service';
import { YzTableStruct } from '../../../../../../main/webapp/app/entities/yz-table-struct/yz-table-struct.model';

describe('Component Tests', () => {

    describe('YzTableStruct Management Dialog Component', () => {
        let comp: YzTableStructDialogComponent;
        let fixture: ComponentFixture<YzTableStructDialogComponent>;
        let service: YzTableStructService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CdbGradeTestModule],
                declarations: [YzTableStructDialogComponent],
                providers: [
                    YzTableStructService
                ]
            })
            .overrideTemplate(YzTableStructDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(YzTableStructDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YzTableStructService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new YzTableStruct(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.yzTableStruct = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'yzTableStructListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new YzTableStruct();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.yzTableStruct = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'yzTableStructListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
