import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IStudentFee } from 'app/shared/model/student-fee.model';
import { StudentFeeService } from './student-fee.service';

@Component({
    selector: 'jhi-student-fee-update',
    templateUrl: './student-fee-update.component.html'
})
export class StudentFeeUpdateComponent implements OnInit {
    studentFee: IStudentFee;
    isSaving: boolean;

    constructor(protected studentFeeService: StudentFeeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ studentFee }) => {
            this.studentFee = studentFee;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.studentFee.id !== undefined) {
            this.subscribeToSaveResponse(this.studentFeeService.update(this.studentFee));
        } else {
            this.subscribeToSaveResponse(this.studentFeeService.create(this.studentFee));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudentFee>>) {
        result.subscribe((res: HttpResponse<IStudentFee>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
