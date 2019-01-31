import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
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
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected studentService: StudentService,
        protected studentFeeService: StudentFeeService,
        protected classNameService: ClassNameService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ student }) => {
            this.student = student;
        });
        this.studentFeeService
            .query({ filter: 'student-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IStudentFee[]>) => mayBeOk.ok),
                map((response: HttpResponse<IStudentFee[]>) => response.body)
            )
            .subscribe(
                (res: IStudentFee[]) => {
                    if (!this.student.fee || !this.student.fee.id) {
                        this.fees = res;
                    } else {
                        this.studentFeeService
                            .find(this.student.fee.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IStudentFee>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IStudentFee>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IStudentFee) => (this.fees = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.classNameService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IClassName[]>) => mayBeOk.ok),
                map((response: HttpResponse<IClassName[]>) => response.body)
            )
            .subscribe((res: IClassName[]) => (this.classnames = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.student, this.elementRef, field, fieldContentType, idInput);
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
