import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAttendence } from 'app/shared/model/attendence.model';
import { AccountService } from 'app/core';
import { AttendenceService } from './attendence.service';

@Component({
    selector: 'jhi-attendence',
    templateUrl: './attendence.component.html'
})
export class AttendenceComponent implements OnInit, OnDestroy {
    attendences: IAttendence[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected attendenceService: AttendenceService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.attendenceService.query().subscribe(
            (res: HttpResponse<IAttendence[]>) => {
                this.attendences = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAttendences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAttendence) {
        return item.id;
    }

    registerChangeInAttendences() {
        this.eventSubscriber = this.eventManager.subscribe('attendenceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
