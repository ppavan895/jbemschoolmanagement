import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JbemSchoolManagementSharedModule } from 'app/shared';
import {
    SectionComponent,
    SectionDetailComponent,
    SectionUpdateComponent,
    SectionDeletePopupComponent,
    SectionDeleteDialogComponent,
    sectionRoute,
    sectionPopupRoute
} from './';

const ENTITY_STATES = [...sectionRoute, ...sectionPopupRoute];

@NgModule({
    imports: [JbemSchoolManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SectionComponent,
        SectionDetailComponent,
        SectionUpdateComponent,
        SectionDeleteDialogComponent,
        SectionDeletePopupComponent
    ],
    entryComponents: [SectionComponent, SectionUpdateComponent, SectionDeleteDialogComponent, SectionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbemSchoolManagementSectionModule {}
