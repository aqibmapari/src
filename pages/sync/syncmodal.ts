import { Component } from '@angular/core';
import {Platform, NavParams, ViewController } from 'ionic-angular';

// import {UtilService} from '../../app/services/util.service';
// import {DatabaseService} from '../../app/services/database.service';
// import {SharedService} from '../../app/services/sharedservice';
import {APIRequestService} from '../../app/services/apirequest.service';
import {AfterLoginAPIService} from '../../app/services/afterloginapi.service';
import {MasterSyncAPIService} from '../../app/services/mastersyncapi.service';
import {CustomerSyncAPIService} from '../../app/services/customersyncapi.service';
import {VisitSyncAPIService} from '../../app/services/visitsyncapi.service';
@Component({
    templateUrl: 'syncmodal.html'
})
export class SyncModalPage {
    items;

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        // public utilService: UtilService,
        // public databaseService: DatabaseService,
        // public sharedService: SharedService,
        public apiRequestService: APIRequestService,
        public afterLoginAPIService: AfterLoginAPIService,
        public masterSyncAPIService: MasterSyncAPIService,
        public customerSyncAPIService: CustomerSyncAPIService,
        public visitSyncAPIService: VisitSyncAPIService
    ) {
        this.items = [{title:'Sync All', id:'allsync',note:'Last 12.01.2016 09:35:05'},
            {title:'Sync Masters Data', id:'mastersync',note:'Last 12.01.2016 09:38:05'},
            {title:'Send Data', id:'sendsync',note:'Last 11.01.2016 17:57:23'}
        ];
    }
    getData(id){
        if(id == "allsync"){
    		this.insertData();
    	}
    	else if(id == "mastersync"){
    		this.insertMasters();
    	}
    	else if(id == "orderssync"){
    		this.sendData();
    	}
    }
    insertData(){
        this.apiRequestService.presentLoader('Please Wait... All Data Syncing.');
        this.customerSyncAPIService.callCustomer(0).then((obj) => {
            this.visitSyncAPIService.callVisitPJP().then((obj) => {
                // add visit/call related API here later
                this.customerSyncAPIService.callCustCredit(0,0).then((obj) => {
                    this.customerSyncAPIService.callCustSOInvDetails(0,0).then((obj) => {
                        this.customerSyncAPIService.callCustomerContact(0).then((obj) => {
                            this.customerSyncAPIService.callCustomerAssetMaster(0,0).then((obj) => {
                                this.apiRequestService.presentToast('Done');
                                this.apiRequestService.dismissLoader();
                            }, (err) => {this.onAPIError();});
                        }, (err) => {this.onAPIError();});
                    }, (err) => {this.onAPIError();});
                }, (err) => {this.onAPIError();});
            }, (err) => {this.onAPIError();});
        }, (err) => {this.onAPIError();});
    }
    insertMasters(){
        this.apiRequestService.presentLoader('Please Wait... Masters Data Syncing.');
        this.masterSyncAPIService.callMaterial(0).then((obj) => {
            this.masterSyncAPIService.callArticlePricelist().then((obj) => {
                this.masterSyncAPIService.callPriorityMaster().then((obj) => {
                    this.masterSyncAPIService.callPromoDetails(0,0,0,0).then((obj) => {
                        this.apiRequestService.presentToast('Done');
                        this.apiRequestService.dismissLoader();
                    }, (err) => {this.onAPIError();});
                }, (err) => {this.onAPIError();});
            }, (err) => {this.onAPIError();});
        }, (err) => {this.onAPIError();});
    }
    sendData(){

    }
    onAPIError(){
        this.apiRequestService.dismissLoader();
        this.apiRequestService.presentToast('Could Not Connect to server. Please check internet connection and retry');
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
