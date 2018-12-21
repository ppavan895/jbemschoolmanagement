/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JbemSchoolManagementTestModule } from '../../../test.module';
import { SectionComponent } from 'app/entities/section/section.component';
import { SectionService } from 'app/entities/section/section.service';
import { Section } from 'app/shared/model/section.model';

describe('Component Tests', () => {
    describe('Section Management Component', () => {
        let comp: SectionComponent;
        let fixture: ComponentFixture<SectionComponent>;
        let service: SectionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbemSchoolManagementTestModule],
                declarations: [SectionComponent],
                providers: []
            })
                .overrideTemplate(SectionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SectionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SectionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Section(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sections[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});