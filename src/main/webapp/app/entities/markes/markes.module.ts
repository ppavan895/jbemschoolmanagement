import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JbemSchoolManagementSharedModule } from 'app/shared';
import {
    MarkesComponent,
    MarkesDetailComponent,
    MarkesUpdateComponent,
    MarkesDeletePopupComponent,
    MarkesDeleteDialogComponent,
    markesRoute,
    markesPopupRoute
} from './';

const ENTITY_STATES = [...markesRoute, ...markesPopupRoute];

@NgModule({
    imports: [JbemSchoolManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MarkesComponent, MarkesDetailComponent, MarkesUpdateComponent, MarkesDeleteDialogComponent, MarkesDeletePopupComponent],
    entryComponents: [MarkesComponent, MarkesUpdateComponent, MarkesDeleteDialogComponent, MarkesDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbemSchoolManagementMarkesModule {}
