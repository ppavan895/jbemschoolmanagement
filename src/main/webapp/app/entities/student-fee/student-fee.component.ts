import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStudentFee } from 'app/shared/model/student-fee.model';
import { AccountService } from 'app/core';
import { StudentFeeService } from './student-fee.service';

@Component({
    selector: 'jhi-student-fee',
    templateUrl: './student-fee.component.html'
})
export class StudentFeeComponent implements OnInit, OnDestroy {
    studentFees: IStudentFee[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected studentFeeService: StudentFeeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.studentFeeService
            .query()
            .pipe(
                filter((res: HttpResponse<IStudentFee[]>) => res.ok),
                map((res: HttpResponse<IStudentFee[]>) => res.body)
            )
            .subscribe(
                (res: IStudentFee[]) => {
                    this.studentFees = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInStudentFees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStudentFee) {
        return item.id;
    }

    registerChangeInStudentFees() {
        this.eventSubscriber = this.eventManager.subscribe('studentFeeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
