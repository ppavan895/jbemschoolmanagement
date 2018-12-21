import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JbemSchoolManagementTeacherModule } from './teacher/teacher.module';
import { JbemSchoolManagementStudentModule } from './student/student.module';
import { JbemSchoolManagementClassNameModule } from './class-name/class-name.module';
import { JbemSchoolManagementSectionModule } from './section/section.module';
import { JbemSchoolManagementSubjectModule } from './subject/subject.module';
import { JbemSchoolManagementMarkesModule } from './markes/markes.module';
import { JbemSchoolManagementAttendenceModule } from './attendence/attendence.module';
import { JbemSchoolManagementStudentFeeModule } from './student-fee/student-fee.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JbemSchoolManagementTeacherModule,
        JbemSchoolManagementStudentModule,
        JbemSchoolManagementClassNameModule,
        JbemSchoolManagementSectionModule,
        JbemSchoolManagementSubjectModule,
        JbemSchoolManagementMarkesModule,
        JbemSchoolManagementAttendenceModule,
        JbemSchoolManagementStudentFeeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbemSchoolManagementEntityModule {}
