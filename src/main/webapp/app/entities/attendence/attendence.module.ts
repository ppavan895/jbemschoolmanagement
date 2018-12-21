import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JbemSchoolManagementSharedModule } from 'app/shared';
import {
    AttendenceComponent,
    AttendenceDetailComponent,
    AttendenceUpdateComponent,
    AttendenceDeletePopupComponent,
    AttendenceDeleteDialogComponent,
    attendenceRoute,
    attendencePopupRoute
} from './';

const ENTITY_STATES = [...attendenceRoute, ...attendencePopupRoute];

@NgModule({
    imports: [JbemSchoolManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AttendenceComponent,
        AttendenceDetailComponent,
        AttendenceUpdateComponent,
        AttendenceDeleteDialogComponent,
        AttendenceDeletePopupComponent
    ],
    entryComponents: [AttendenceComponent, AttendenceUpdateComponent, AttendenceDeleteDialogComponent, AttendenceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbemSchoolManagementAttendenceModule {}
