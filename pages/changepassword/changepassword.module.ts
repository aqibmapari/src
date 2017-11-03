import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import {SharedModule} from '../../app/shared.module';
import {ChangePasswordHeader } from './changepasswordheader.component';
import {ChangePasswordView} from './view/changepasswordview.component';

@NgModule({
  declarations: [
    ChangePasswordHeader,
	ChangePasswordView
  ],
  imports: [
    IonicModule.forRoot(ChangePasswordHeader),
	SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChangePasswordHeader,
	ChangePasswordView
  ],
  providers: []
})
export class ChangePasswordModule {}
