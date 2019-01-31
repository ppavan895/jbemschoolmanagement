/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JbemSchoolManagementTestModule } from '../../../test.module';
import { MarkesComponent } from 'app/entities/markes/markes.component';
import { MarkesService } from 'app/entities/markes/markes.service';
import { Markes } from 'app/shared/model/markes.model';

describe('Component Tests', () => {
    describe('Markes Management Component', () => {
        let comp: MarkesComponent;
        let fixture: ComponentFixture<MarkesComponent>;
        let service: MarkesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbemSchoolManagementTestModule],
                declarations: [MarkesComponent],
                providers: []
            })
                .overrideTemplate(MarkesComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MarkesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarkesService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Markes(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.markes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
