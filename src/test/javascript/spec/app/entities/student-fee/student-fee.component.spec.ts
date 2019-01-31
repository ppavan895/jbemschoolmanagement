/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JbemSchoolManagementTestModule } from '../../../test.module';
import { StudentFeeComponent } from 'app/entities/student-fee/student-fee.component';
import { StudentFeeService } from 'app/entities/student-fee/student-fee.service';
import { StudentFee } from 'app/shared/model/student-fee.model';

describe('Component Tests', () => {
    describe('StudentFee Management Component', () => {
        let comp: StudentFeeComponent;
        let fixture: ComponentFixture<StudentFeeComponent>;
        let service: StudentFeeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbemSchoolManagementTestModule],
                declarations: [StudentFeeComponent],
                providers: []
            })
                .overrideTemplate(StudentFeeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StudentFeeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentFeeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new StudentFee(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.studentFees[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
