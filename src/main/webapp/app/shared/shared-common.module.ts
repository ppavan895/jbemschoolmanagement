import { NgModule } from '@angular/core';

import { JbemSchoolManagementSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [JbemSchoolManagementSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [JbemSchoolManagementSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JbemSchoolManagementSharedCommonModule {}
