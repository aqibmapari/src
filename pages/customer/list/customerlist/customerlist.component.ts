import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {UtilService} from '../../../../app/services/util.service';
import {DatabaseService} from '../../../../app/services/database.service';
import {SharedService} from '../../../../app/services/sharedservice';
import { CustomerDetailsHeader } from '../../details/customerdetailsheader.component';

@Component({
	selector: 'customer-list',
	templateUrl: 'customerlist.html'
})
export class CustomerList {
	items = [];
    groupedObjects = [];
	constructor(public navCtrl: NavController,
		private utilService: UtilService,
		public databaseService: DatabaseService,
		public sharedService: SharedService) {

	}
	ngOnInit() {
		this.items = [];
		var pernr = this.sharedService.getPernr();
		this.databaseService.selectTableQuery('customermst',
		'*',
		'WHERE pernr=?',[this.utilService.encode64(pernr)],0)
		.then((results) => {
			// console.log(JSON.stringify(results));
			if(results['rows'].length !== 0){
				for(var i=0; i<results['rows'].length; i++){
					var row = results['rows']['item'](i);
					var obj = {};
					obj['pernr'] = pernr;
					obj['kunnr'] = this.utilService.decode64(row.kunnr);
					obj['name1'] = this.utilService.decode64(row.name1);
					obj['address'] = this.utilService.decode64(row.address);
					obj['custclass'] = this.utilService.decode64(row.custclass);
					obj['branch'] = this.utilService.decode64(row.branch);
					obj['chain'] = this.utilService.decode64(row.chain);
					obj['popclass'] = this.utilService.decode64(row.popclass);
					obj['abcclass'] = this.utilService.decode64(row.abcclass);
					obj['custgrp'] = this.utilService.decode64(row.custgrp);
					obj['custstatus'] = this.utilService.decode64(row.custstatus);
					obj['custtype'] = this.utilService.decode64(row.custtype);
					obj['latitude'] = this.utilService.decode64(row.latitude);
					obj['longitude'] = this.utilService.decode64(row.longitude);
					obj['parentgroup'] = this.utilService.decode64(row.parentgroup);
					obj['channeltype1'] = this.utilService.decode64(row.channeltype1);
					obj['channeltype2'] = this.utilService.decode64(row.channeltype2);
					obj['territory'] = this.utilService.decode64(row.territory);
					obj['outletname'] = this.utilService.decode64(row.outletname);
					obj['website'] = this.utilService.decode64(row.website);
					obj['zterm'] = this.utilService.decode64(row.zterm);
					obj['cflag'] = this.utilService.decode64(row.cflag);
					obj['billto'] = this.utilService.decode64(row.billto);
					this.items.push(obj);
				}
				this.groupedObjects = this.utilService.groupObjects(this.items,'name1');
			}
		}, (err) => {
			console.log(JSON.stringify(err));
		});
    }
	goToDetails(obj) {
		this.navCtrl.push(CustomerDetailsHeader,{selectedCustomer: obj});
	}
}
