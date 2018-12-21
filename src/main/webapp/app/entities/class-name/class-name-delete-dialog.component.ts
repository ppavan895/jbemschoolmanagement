import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClassName } from 'app/shared/model/class-name.model';
import { ClassNameService } from './class-name.service';

@Component({
    selector: 'jhi-class-name-delete-dialog',
    templateUrl: './class-name-delete-dialog.component.html'
})
export class ClassNameDeleteDialogComponent {
    className: IClassName;

    constructor(
        protected classNameService: ClassNameService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.classNameService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'classNameListModification',
                content: 'Deleted an className'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-class-name-delete-popup',
    template: ''
})
export class ClassNameDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ className }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ClassNameDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.className = className;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
