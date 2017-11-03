import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {CustomerList} from './customerlist/customerlist.component';
import { CustomerListMap } from './customermap/customerlistmap.component';

@Component({
	selector: 'page-customerlist',
	templateUrl: 'customer.html'
})
export class Customer {
	tabsArticle: Array<{title: string,value: string, root: any, icon: string}>;
	segmentModel: string;
	constructor(public navCtrl: NavController) {
		this.tabsArticle = [
			{ title: "Customer",value:"list", root: CustomerList, icon: "calendar" },
			{ title: "Map",value:"map", root: CustomerListMap, icon: "calendar" }
		];
		this.segmentModel = "list";
	}
	segmentValueChange(value:string):void {
		//console.log(value);
		this.segmentModel = value;
	}

}
