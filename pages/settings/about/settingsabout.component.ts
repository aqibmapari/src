import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Device,AppVersion  } from 'ionic-native';
import {UtilService} from '../../../app/services/util.service';
import {DatabaseService} from '../../../app/services/database.service';
import {SharedService} from '../../../app/services/sharedservice';

@Component({
	selector: 'settings-about',
	templateUrl: 'settingsabout.html'
})
export class SettingsAbout {
	selectedSettings : any = {};
	pernr : any;
	constructor(private utilService: UtilService,
		public platform: Platform,
        public databaseService: DatabaseService,
        public sharedService: SharedService
	) {
		this.platform.ready().then(() => {
			console.log(Device);
			this.pernr = this.sharedService.getPernr();
			this.selectedSettings = {
				userid: this.pernr,
				empno: this.pernr,
				model: Device['model'],
				make: Device['manufacturer'],
				imei: Device['uuid'],
				platform: Device['platform'],
				osversion: Device['version']
			};
			AppVersion.getVersionNumber().then((version) => {
				this.selectedSettings.appversion = version;
			});
			var sql = 'SELECT distinct e.pernr,e.nachn,e.vorna,e.role,e.password,e.roledesc,e.reportto,e.emailid,e.designation,e.status,'+
			'e1.nachn as reporttonachn,e1.vorna as reporttovorna FROM empdetails e LEFT OUTER JOIN empdetails e1 ON e.pernr = e1.pernr and e.pernr=?'
			this.databaseService.selectComplexQuery(sql,[this.utilService.encode64(this.pernr)],0)
            .then((results) => {
                console.log(JSON.stringify(results));
                if(results['rows'].length !== 0){
                    var row = results['rows']['item'](0);
                    this.selectedSettings.firstname = this.utilService.decode64(row.nachn);
                    this.selectedSettings.lastname = this.utilService.decode64(row.vorna);
                    this.selectedSettings.designation = this.utilService.decode64(row.designation);
                    this.selectedSettings.role = (this.utilService.decode64(row.roledesc));
                    this.selectedSettings.emailid = this.utilService.decode64(row.emailid);
					var reportingtofname = this.utilService.decode64(row.reporttonachn);
					var reportingtolname = this.utilService.decode64(row.reporttovorna);
                    if(reportingtofname != null )this.selectedSettings.reportingto = reportingtofname+' '+reportingtolname;
                }
            }, (err) => {
                console.log(JSON.stringify(err));
            });
		});
	}
}
