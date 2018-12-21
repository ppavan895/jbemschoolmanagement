import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StudentFee } from 'app/shared/model/student-fee.model';
import { StudentFeeService } from './student-fee.service';
import { StudentFeeComponent } from './student-fee.component';
import { StudentFeeDetailComponent } from './student-fee-detail.component';
import { StudentFeeUpdateComponent } from './student-fee-update.component';
import { StudentFeeDeletePopupComponent } from './student-fee-delete-dialog.component';
import { IStudentFee } from 'app/shared/model/student-fee.model';

@Injectable({ providedIn: 'root' })
export class StudentFeeResolve implements Resolve<IStudentFee> {
    constructor(private service: StudentFeeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StudentFee> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<StudentFee>) => response.ok),
                map((studentFee: HttpResponse<StudentFee>) => studentFee.body)
            );
        }
        return of(new StudentFee());
    }
}

export const studentFeeRoute: Routes = [
    {
        path: 'student-fee',
        component: StudentFeeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentFees'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-fee/:id/view',
        component: StudentFeeDetailComponent,
        resolve: {
            studentFee: StudentFeeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentFees'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-fee/new',
        component: StudentFeeUpdateComponent,
        resolve: {
            studentFee: StudentFeeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentFees'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-fee/:id/edit',
        component: StudentFeeUpdateComponent,
        resolve: {
            studentFee: StudentFeeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentFees'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentFeePopupRoute: Routes = [
    {
        path: 'student-fee/:id/delete',
        component: StudentFeeDeletePopupComponent,
        resolve: {
            studentFee: StudentFeeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentFees'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
