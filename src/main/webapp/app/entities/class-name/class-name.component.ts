import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClassName } from 'app/shared/model/class-name.model';
import { AccountService } from 'app/core';
import { ClassNameService } from './class-name.service';

@Component({
    selector: 'jhi-class-name',
    templateUrl: './class-name.component.html'
})
export class ClassNameComponent implements OnInit, OnDestroy {
    classNames: IClassName[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected classNameService: ClassNameService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.classNameService
            .query()
            .pipe(
                filter((res: HttpResponse<IClassName[]>) => res.ok),
                map((res: HttpResponse<IClassName[]>) => res.body)
            )
            .subscribe(
                (res: IClassName[]) => {
                    this.classNames = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInClassNames();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IClassName) {
        return item.id;
    }

    registerChangeInClassNames() {
        this.eventSubscriber = this.eventManager.subscribe('classNameListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
