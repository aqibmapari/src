import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import {SharedModule} from '../../app/shared.module';
import {SettingsHeader } from './settingsheader.component';
import {SettingsAbout} from './about/settingsabout.component';
import {SettingsAuthorizations} from './authorizations/settingsauthorizations.component';
import {SettingsBackend} from './backend/settingsbackend.component';
import {SettingsDefault} from './default/settingsdefault.component';

@NgModule({
  declarations: [
    SettingsHeader,
	SettingsAbout,
	SettingsAuthorizations,
	SettingsBackend,
	SettingsDefault
  ],
  imports: [
    IonicModule.forRoot(SettingsHeader),
	SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SettingsHeader,
	SettingsAbout,
	SettingsAuthorizations,
	SettingsBackend,
	SettingsDefault
  ],
  providers: []
})
export class SettingsModule {}
