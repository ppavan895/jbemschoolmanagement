import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { IStudentFee } from 'app/shared/model/student-fee.model';
import { StudentFeeService } from 'app/entities/student-fee';
import { IClassName } from 'app/shared/model/class-name.model';
import { ClassNameService } from 'app/entities/class-name';

@Component({
    selector: 'jhi-student-update',
    templateUrl: './student-update.component.html'
})
export class StudentUpdateComponent implements OnInit {
    student: IStudent;
    isSaving: boolean;

    fees: IStudentFee[];

    classnames: IClassName[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected studentService: StudentService,
        protected studentFeeService: StudentFeeService,
        protected classNameService: ClassNameService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ student }) => {
            this.student = student;
        });
        this.studentFeeService.query({ filter: 'student-is-null' }).subscribe(
            (res: HttpResponse<IStudentFee[]>) => {
                if (!this.student.fee || !this.student.fee.id) {
                    this.fees = res.body;
                } else {
                    this.studentFeeService.find(this.student.fee.id).subscribe(
                        (subRes: HttpResponse<IStudentFee>) => {
                            this.fees = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.classNameService.query().subscribe(
            (res: HttpResponse<IClassName[]>) => {
                this.classnames = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.student.id !== undefined) {
            this.subscribeToSaveResponse(this.studentService.update(this.student));
        } else {
            this.subscribeToSaveResponse(this.studentService.create(this.student));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>) {
        result.subscribe((res: HttpResponse<IStudent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackStudentFeeById(index: number, item: IStudentFee) {
        return item.id;
    }

    trackClassNameById(index: number, item: IClassName) {
        return item.id;
    }
}
