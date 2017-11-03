import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {ChangePasswordView} from './view/changepasswordview.component';

@Component({
	selector: 'page-changepassword',
	templateUrl: 'changepasswordheader.html'
})
export class ChangePasswordHeader {
	tabs: Array<{title: string,value: string, root: any, icon: string}>;
	segmentModel: string;
	constructor(public navCtrl: NavController) {
		this.tabs = [
			{ title: "Change Password",value:"view", root: ChangePasswordView, icon: "calendar" }
		];
		this.segmentModel = "view";
	}
	segmentValueChange(value:string):void {
		//console.log(value);
		this.segmentModel = value;
	}
}
