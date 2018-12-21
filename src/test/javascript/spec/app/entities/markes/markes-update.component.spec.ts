/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JbemSchoolManagementTestModule } from '../../../test.module';
import { MarkesUpdateComponent } from 'app/entities/markes/markes-update.component';
import { MarkesService } from 'app/entities/markes/markes.service';
import { Markes } from 'app/shared/model/markes.model';

describe('Component Tests', () => {
    describe('Markes Management Update Component', () => {
        let comp: MarkesUpdateComponent;
        let fixture: ComponentFixture<MarkesUpdateComponent>;
        let service: MarkesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbemSchoolManagementTestModule],
                declarations: [MarkesUpdateComponent]
            })
                .overrideTemplate(MarkesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MarkesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarkesService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Markes(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.markes = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Markes();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.markes = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
