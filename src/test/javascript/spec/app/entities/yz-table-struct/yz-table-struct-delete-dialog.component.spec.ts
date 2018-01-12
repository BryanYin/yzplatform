/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CdbGradeTestModule } from '../../../test.module';
import { YzTableStructDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/yz-table-struct/yz-table-struct-delete-dialog.component';
import { YzTableStructService } from '../../../../../../main/webapp/app/entities/yz-table-struct/yz-table-struct.service';

describe('Component Tests', () => {

    describe('YzTableStruct Management Delete Component', () => {
        let comp: YzTableStructDeleteDialogComponent;
        let fixture: ComponentFixture<YzTableStructDeleteDialogComponent>;
        let service: YzTableStructService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CdbGradeTestModule],
                declarations: [YzTableStructDeleteDialogComponent],
                providers: [
                    YzTableStructService
                ]
            })
            .overrideTemplate(YzTableStructDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(YzTableStructDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YzTableStructService);
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
