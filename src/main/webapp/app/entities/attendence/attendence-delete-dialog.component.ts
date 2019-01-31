import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAttendence } from 'app/shared/model/attendence.model';
import { AttendenceService } from './attendence.service';

@Component({
    selector: 'jhi-attendence-delete-dialog',
    templateUrl: './attendence-delete-dialog.component.html'
})
export class AttendenceDeleteDialogComponent {
    attendence: IAttendence;

    constructor(
        protected attendenceService: AttendenceService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.attendenceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'attendenceListModification',
                content: 'Deleted an attendence'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-attendence-delete-popup',
    template: ''
})
export class AttendenceDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ attendence }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AttendenceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.attendence = attendence;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/attendence', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/attendence', { outlets: { popup: null } }]);
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
