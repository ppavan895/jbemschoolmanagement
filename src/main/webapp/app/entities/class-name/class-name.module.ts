import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JbemSchoolManagementSharedModule } from 'app/shared';
import {
    ClassNameComponent,
    ClassNameDetailComponent,
    ClassNameUpdateComponent,
    ClassNameDeletePopupComponent,
    ClassNameDeleteDialogComponent,
    classNameRoute,
    classNamePopupRoute
} from './';

const ENTITY_STATES = [...classNameRoute, ...classNamePopupRoute];

@NgModule({
    imports: [JbemSchoolManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ClassNameComponent,
        ClassNameDetailComponent,
        ClassNameUpdateComponent,
        ClassNameDeleteDialogComponent,
        ClassNameDeletePopupComponent
    ],
    entryComponents: [ClassNameComponent, ClassNameUpdateComponent, ClassNameDeleteDialogComponent, ClassNameDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbemSchoolManagementClassNameModule {}
