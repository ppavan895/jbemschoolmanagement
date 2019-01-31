import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ClassName } from 'app/shared/model/class-name.model';
import { ClassNameService } from './class-name.service';
import { ClassNameComponent } from './class-name.component';
import { ClassNameDetailComponent } from './class-name-detail.component';
import { ClassNameUpdateComponent } from './class-name-update.component';
import { ClassNameDeletePopupComponent } from './class-name-delete-dialog.component';
import { IClassName } from 'app/shared/model/class-name.model';

@Injectable({ providedIn: 'root' })
export class ClassNameResolve implements Resolve<IClassName> {
    constructor(private service: ClassNameService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClassName> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ClassName>) => response.ok),
                map((className: HttpResponse<ClassName>) => className.body)
            );
        }
        return of(new ClassName());
    }
}

export const classNameRoute: Routes = [
    {
        path: '',
        component: ClassNameComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClassNames'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ClassNameDetailComponent,
        resolve: {
            className: ClassNameResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClassNames'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ClassNameUpdateComponent,
        resolve: {
            className: ClassNameResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClassNames'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ClassNameUpdateComponent,
        resolve: {
            className: ClassNameResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClassNames'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const classNamePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ClassNameDeletePopupComponent,
        resolve: {
            className: ClassNameResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClassNames'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
