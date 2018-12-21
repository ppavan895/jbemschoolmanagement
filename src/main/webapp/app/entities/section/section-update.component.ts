import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISection } from 'app/shared/model/section.model';
import { SectionService } from './section.service';
import { IClassName } from 'app/shared/model/class-name.model';
import { ClassNameService } from 'app/entities/class-name';

@Component({
    selector: 'jhi-section-update',
    templateUrl: './section-update.component.html'
})
export class SectionUpdateComponent implements OnInit {
    section: ISection;
    isSaving: boolean;

    classnames: IClassName[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected sectionService: SectionService,
        protected classNameService: ClassNameService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ section }) => {
            this.section = section;
        });
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
        if (this.section.id !== undefined) {
            this.subscribeToSaveResponse(this.sectionService.update(this.section));
        } else {
            this.subscribeToSaveResponse(this.sectionService.create(this.section));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISection>>) {
        result.subscribe((res: HttpResponse<ISection>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
