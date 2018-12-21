import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from './subject.service';
import { IClassName } from 'app/shared/model/class-name.model';
import { ClassNameService } from 'app/entities/class-name';
import { IMarkes } from 'app/shared/model/markes.model';
import { MarkesService } from 'app/entities/markes';

@Component({
    selector: 'jhi-subject-update',
    templateUrl: './subject-update.component.html'
})
export class SubjectUpdateComponent implements OnInit {
    subject: ISubject;
    isSaving: boolean;

    classnames: IClassName[];

    markes: IMarkes[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected subjectService: SubjectService,
        protected classNameService: ClassNameService,
        protected markesService: MarkesService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subject }) => {
            this.subject = subject;
        });
        this.classNameService.query().subscribe(
            (res: HttpResponse<IClassName[]>) => {
                this.classnames = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.markesService.query().subscribe(
            (res: HttpResponse<IMarkes[]>) => {
                this.markes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.subject.id !== undefined) {
            this.subscribeToSaveResponse(this.subjectService.update(this.subject));
        } else {
            this.subscribeToSaveResponse(this.subjectService.create(this.subject));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubject>>) {
        result.subscribe((res: HttpResponse<ISubject>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackClassNameById(index: number, item: IClassName) {
        return item.id;
    }

    trackMarkesById(index: number, item: IMarkes) {
        return item.id;
    }
}
