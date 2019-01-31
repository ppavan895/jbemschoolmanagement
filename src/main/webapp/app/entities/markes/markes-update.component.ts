import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMarkes } from 'app/shared/model/markes.model';
import { MarkesService } from './markes.service';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student';

@Component({
    selector: 'jhi-markes-update',
    templateUrl: './markes-update.component.html'
})
export class MarkesUpdateComponent implements OnInit {
    markes: IMarkes;
    isSaving: boolean;

    students: IStudent[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected markesService: MarkesService,
        protected studentService: StudentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ markes }) => {
            this.markes = markes;
        });
        this.studentService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IStudent[]>) => mayBeOk.ok),
                map((response: HttpResponse<IStudent[]>) => response.body)
            )
            .subscribe((res: IStudent[]) => (this.students = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.markes.id !== undefined) {
            this.subscribeToSaveResponse(this.markesService.update(this.markes));
        } else {
            this.subscribeToSaveResponse(this.markesService.create(this.markes));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMarkes>>) {
        result.subscribe((res: HttpResponse<IMarkes>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
