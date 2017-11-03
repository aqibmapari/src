import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UtilService} from '../../../app/services/util.service';
import {DatabaseService} from '../../../app/services/database.service';
import {SharedService} from '../../../app/services/sharedservice';

@Component({
	selector: 'changepassword-view',
	templateUrl: 'changepasswordview.html'
})
export class ChangePasswordView {
	pernr : any;
	passwordForm : FormGroup;
	passwordInfo: {oldPasswd: string, newPasswd: string, rePasswd: string} = {oldPasswd: '', newPasswd: '', rePasswd: ''};
	constructor(private utilService: UtilService,
		public databaseService: DatabaseService,
		public sharedService: SharedService) {
		this.pernr = this.sharedService.getPernr();

		this.passwordForm = new FormGroup({

			oldpassword: new FormControl('', [Validators.required]),
			matchingPassword: new FormGroup({
				newpassword: new FormControl('', [Validators.required]),
				reenterpassword: new FormControl('', [Validators.required]),
			})
		});
	}
	// nameValidator(control: FormControl): {[s: string]: boolean} {
	// 	if (!control.value.match("40143")) {
	// 		return {invalidName: true};
	// 	}
	// }
}
