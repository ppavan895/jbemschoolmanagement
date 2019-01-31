/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JbemSchoolManagementTestModule } from '../../../test.module';
import { ClassNameComponent } from 'app/entities/class-name/class-name.component';
import { ClassNameService } from 'app/entities/class-name/class-name.service';
import { ClassName } from 'app/shared/model/class-name.model';

describe('Component Tests', () => {
    describe('ClassName Management Component', () => {
        let comp: ClassNameComponent;
        let fixture: ComponentFixture<ClassNameComponent>;
        let service: ClassNameService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbemSchoolManagementTestModule],
                declarations: [ClassNameComponent],
                providers: []
            })
                .overrideTemplate(ClassNameComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClassNameComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassNameService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ClassName(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.classNames[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
