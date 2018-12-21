import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JbemSchoolManagementSharedModule } from 'app/shared';
import {
    StudentFeeComponent,
    StudentFeeDetailComponent,
    StudentFeeUpdateComponent,
    StudentFeeDeletePopupComponent,
    StudentFeeDeleteDialogComponent,
    studentFeeRoute,
    studentFeePopupRoute
} from './';

const ENTITY_STATES = [...studentFeeRoute, ...studentFeePopupRoute];

@NgModule({
    imports: [JbemSchoolManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StudentFeeComponent,
        StudentFeeDetailComponent,
        StudentFeeUpdateComponent,
        StudentFeeDeleteDialogComponent,
        StudentFeeDeletePopupComponent
    ],
    entryComponents: [StudentFeeComponent, StudentFeeUpdateComponent, StudentFeeDeleteDialogComponent, StudentFeeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbemSchoolManagementStudentFeeModule {}
