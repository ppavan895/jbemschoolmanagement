/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JbemSchoolManagementTestModule } from '../../../test.module';
import { ClassNameDeleteDialogComponent } from 'app/entities/class-name/class-name-delete-dialog.component';
import { ClassNameService } from 'app/entities/class-name/class-name.service';

describe('Component Tests', () => {
    describe('ClassName Management Delete Component', () => {
        let comp: ClassNameDeleteDialogComponent;
        let fixture: ComponentFixture<ClassNameDeleteDialogComponent>;
        let service: ClassNameService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbemSchoolManagementTestModule],
                declarations: [ClassNameDeleteDialogComponent]
            })
                .overrideTemplate(ClassNameDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClassNameDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassNameService);
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
