/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JbemSchoolManagementTestModule } from '../../../test.module';
import { MarkesDeleteDialogComponent } from 'app/entities/markes/markes-delete-dialog.component';
import { MarkesService } from 'app/entities/markes/markes.service';

describe('Component Tests', () => {
    describe('Markes Management Delete Component', () => {
        let comp: MarkesDeleteDialogComponent;
        let fixture: ComponentFixture<MarkesDeleteDialogComponent>;
        let service: MarkesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbemSchoolManagementTestModule],
                declarations: [MarkesDeleteDialogComponent]
            })
                .overrideTemplate(MarkesDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MarkesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarkesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
