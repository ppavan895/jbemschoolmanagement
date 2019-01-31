import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudentFee } from 'app/shared/model/student-fee.model';
import { StudentFeeService } from './student-fee.service';

@Component({
    selector: 'jhi-student-fee-delete-dialog',
    templateUrl: './student-fee-delete-dialog.component.html'
})
export class StudentFeeDeleteDialogComponent {
    studentFee: IStudentFee;

    constructor(
        protected studentFeeService: StudentFeeService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.studentFeeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'studentFeeListModification',
                content: 'Deleted an studentFee'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-student-fee-delete-popup',
    template: ''
})
export class StudentFeeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ studentFee }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StudentFeeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.studentFee = studentFee;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/student-fee', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/student-fee', { outlets: { popup: null } }]);
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
