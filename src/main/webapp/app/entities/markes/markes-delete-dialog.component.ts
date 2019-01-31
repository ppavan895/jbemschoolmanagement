import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMarkes } from 'app/shared/model/markes.model';
import { MarkesService } from './markes.service';

@Component({
    selector: 'jhi-markes-delete-dialog',
    templateUrl: './markes-delete-dialog.component.html'
})
export class MarkesDeleteDialogComponent {
    markes: IMarkes;

    constructor(protected markesService: MarkesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.markesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'markesListModification',
                content: 'Deleted an markes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-markes-delete-popup',
    template: ''
})
export class MarkesDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ markes }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MarkesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.markes = markes;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/markes', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/markes', { outlets: { popup: null } }]);
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
