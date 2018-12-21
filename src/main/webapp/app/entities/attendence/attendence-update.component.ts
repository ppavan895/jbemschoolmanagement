import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAttendence } from 'app/shared/model/attendence.model';
import { AttendenceService } from './attendence.service';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student';

@Component({
    selector: 'jhi-attendence-update',
    templateUrl: './attendence-update.component.html'
})
export class AttendenceUpdateComponent implements OnInit {
    attendence: IAttendence;
    isSaving: boolean;

    students: IStudent[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected attendenceService: AttendenceService,
        protected studentService: StudentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ attendence }) => {
            this.attendence = attendence;
        });
        this.studentService.query().subscribe(
            (res: HttpResponse<IStudent[]>) => {
                this.students = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.attendence.id !== undefined) {
            this.subscribeToSaveResponse(this.attendenceService.update(this.attendence));
        } else {
            this.subscribeToSaveResponse(this.attendenceService.create(this.attendence));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttendence>>) {
        result.subscribe((res: HttpResponse<IAttendence>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStudentById(index: number, item: IStudent) {
        return item.id;
    }
}
