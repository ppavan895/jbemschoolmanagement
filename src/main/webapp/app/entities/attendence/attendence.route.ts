import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Attendence } from 'app/shared/model/attendence.model';
import { AttendenceService } from './attendence.service';
import { AttendenceComponent } from './attendence.component';
import { AttendenceDetailComponent } from './attendence-detail.component';
import { AttendenceUpdateComponent } from './attendence-update.component';
import { AttendenceDeletePopupComponent } from './attendence-delete-dialog.component';
import { IAttendence } from 'app/shared/model/attendence.model';

@Injectable({ providedIn: 'root' })
export class AttendenceResolve implements Resolve<IAttendence> {
    constructor(private service: AttendenceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Attendence> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Attendence>) => response.ok),
                map((attendence: HttpResponse<Attendence>) => attendence.body)
            );
        }
        return of(new Attendence());
    }
}

export const attendenceRoute: Routes = [
    {
        path: 'attendence',
        component: AttendenceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Attendences'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'attendence/:id/view',
        component: AttendenceDetailComponent,
        resolve: {
            attendence: AttendenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Attendences'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'attendence/new',
        component: AttendenceUpdateComponent,
        resolve: {
            attendence: AttendenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Attendences'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'attendence/:id/edit',
        component: AttendenceUpdateComponent,
        resolve: {
            attendence: AttendenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Attendences'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const attendencePopupRoute: Routes = [
    {
        path: 'attendence/:id/delete',
        component: AttendenceDeletePopupComponent,
        resolve: {
            attendence: AttendenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Attendences'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
