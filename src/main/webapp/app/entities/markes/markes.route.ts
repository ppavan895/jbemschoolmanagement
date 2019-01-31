import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Markes } from 'app/shared/model/markes.model';
import { MarkesService } from './markes.service';
import { MarkesComponent } from './markes.component';
import { MarkesDetailComponent } from './markes-detail.component';
import { MarkesUpdateComponent } from './markes-update.component';
import { MarkesDeletePopupComponent } from './markes-delete-dialog.component';
import { IMarkes } from 'app/shared/model/markes.model';

@Injectable({ providedIn: 'root' })
export class MarkesResolve implements Resolve<IMarkes> {
    constructor(private service: MarkesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMarkes> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Markes>) => response.ok),
                map((markes: HttpResponse<Markes>) => markes.body)
            );
        }
        return of(new Markes());
    }
}

export const markesRoute: Routes = [
    {
        path: '',
        component: MarkesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Markes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MarkesDetailComponent,
        resolve: {
            markes: MarkesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Markes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MarkesUpdateComponent,
        resolve: {
            markes: MarkesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Markes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MarkesUpdateComponent,
        resolve: {
            markes: MarkesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Markes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const markesPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MarkesDeletePopupComponent,
        resolve: {
            markes: MarkesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Markes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
