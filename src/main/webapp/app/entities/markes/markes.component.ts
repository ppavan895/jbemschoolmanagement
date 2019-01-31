import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMarkes } from 'app/shared/model/markes.model';
import { AccountService } from 'app/core';
import { MarkesService } from './markes.service';

@Component({
    selector: 'jhi-markes',
    templateUrl: './markes.component.html'
})
export class MarkesComponent implements OnInit, OnDestroy {
    markes: IMarkes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected markesService: MarkesService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.markesService
            .query()
            .pipe(
                filter((res: HttpResponse<IMarkes[]>) => res.ok),
                map((res: HttpResponse<IMarkes[]>) => res.body)
            )
            .subscribe(
                (res: IMarkes[]) => {
                    this.markes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMarkes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMarkes) {
        return item.id;
    }

    registerChangeInMarkes() {
        this.eventSubscriber = this.eventManager.subscribe('markesListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
