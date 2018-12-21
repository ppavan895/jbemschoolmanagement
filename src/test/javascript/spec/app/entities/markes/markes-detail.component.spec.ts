/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JbemSchoolManagementTestModule } from '../../../test.module';
import { MarkesDetailComponent } from 'app/entities/markes/markes-detail.component';
import { Markes } from 'app/shared/model/markes.model';

describe('Component Tests', () => {
    describe('Markes Management Detail Component', () => {
        let comp: MarkesDetailComponent;
        let fixture: ComponentFixture<MarkesDetailComponent>;
        const route = ({ data: of({ markes: new Markes(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbemSchoolManagementTestModule],
                declarations: [MarkesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MarkesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MarkesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.markes).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
