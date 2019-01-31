import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IClassName } from 'app/shared/model/class-name.model';
import { ClassNameService } from './class-name.service';
import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from 'app/entities/teacher';

@Component({
    selector: 'jhi-class-name-update',
    templateUrl: './class-name-update.component.html'
})
export class ClassNameUpdateComponent implements OnInit {
    className: IClassName;
    isSaving: boolean;

    teachers: ITeacher[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected classNameService: ClassNameService,
        protected teacherService: TeacherService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ className }) => {
            this.className = className;
        });
        this.teacherService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITeacher[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITeacher[]>) => response.body)
            )
            .subscribe((res: ITeacher[]) => (this.teachers = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.className.id !== undefined) {
            this.subscribeToSaveResponse(this.classNameService.update(this.className));
        } else {
            this.subscribeToSaveResponse(this.classNameService.create(this.className));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IClassName>>) {
        result.subscribe((res: HttpResponse<IClassName>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTeacherById(index: number, item: ITeacher) {
        return item.id;
    }
}
