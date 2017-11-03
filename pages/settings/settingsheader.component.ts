import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {SettingsAbout} from './about/settingsabout.component';
import {SettingsAuthorizations} from './authorizations/settingsauthorizations.component';
import {SettingsBackend} from './backend/settingsbackend.component';
import {SettingsDefault} from './default/settingsdefault.component';

@Component({
	selector: 'page-settings',
	templateUrl: 'settingsheader.html'
})
export class SettingsHeader {
	tabs: Array<{title: string,value: string, root: any, icon: string}>;
	segmentModel: string;
	constructor(public navCtrl: NavController) {
		this.tabs = [
			{ title: "About",value:"about", root: SettingsAbout, icon: "calendar" },
			{ title: "Authorizations",value:"authorizations", root: SettingsAuthorizations, icon: "calendar" },
			{ title: "Default",value:"default", root: SettingsBackend, icon: "calendar" },
			{ title: "Backend",value:"backend", root: SettingsDefault, icon: "calendar" }
		];
		this.segmentModel = "about";
	}
	segmentValueChange(value:string):void {
		//console.log(value);
		this.segmentModel = value;
	}
}
