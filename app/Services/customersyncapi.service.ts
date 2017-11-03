import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {UtilService} from '../../app/services/util.service';
import {DatabaseService} from '../../app/services/database.service';
import {SharedService} from '../../app/services/sharedservice';
import {APIRequestService} from '../../app/services/apirequest.service';
@Injectable()
export class CustomerSyncAPIService {
    ip : string;
    pernr : string;
    constructor(public utilService: UtilService,
    public databaseService: DatabaseService,
    public sharedService: SharedService,
    public apiRequestService: APIRequestService) {
        this.ip = this.sharedService.getIP();
    }
  	callCustomer(lasttypeid){
        return new Promise((resolve, reject) => {
            this.pernr = this.sharedService.getPernr();
            let className = this.sharedService.getAPIObj('customers');
            // let pernr = this.utilService.encode64(this.pernr);
            let link = this.ip+className;
            this.insertCustomers(link, lasttypeid, resolve, reject);
        });
  	}
    insertCustomers(link, lasttypeid, resolve, reject){
        // console.log(resolve);
        // link = 'http://212.118.101.174:8081/bsalesfs/CustomerDetailsToApp.do';
        let action = '?pernr='+this.pernr+'&typeid='+lasttypeid;
        this.apiRequestService.getAPI(link+action).then((data) => {
            // console.log(JSON.stringify(data));
            var _len = data['customermst'].length;
            let epernr = this.utilService.encode64(this.pernr);
            if(lasttypeid==0) this.databaseService.deleteTableQuery('customermst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
            if(_len == 0){
                resolve(true);
            }
            else{
                for (var i = 0; i < _len; i++)
                {
                    var row = data['customermst'][i];
                    var pernr = epernr;
                    var name1 = this.utilService.encode64(row.name1);
                    var outletname = this.utilService.encode64(row.NAME_CO);
                    var typeid = (row.typeid);
                    var kunnr = this.utilService.encode64(row.kunnr);
                    var address = this.utilService.encode64(row.address);
                    var custclass = this.utilService.encode64(row.custclass);
                    var branch = this.utilService.encode64(row.branch);
                    var chain = this.utilService.encode64(row.chain);
                    var popclass = this.utilService.encode64(row.popclass);
                    var abcclass = this.utilService.encode64(row.abcclass);
                    var custgrp = this.utilService.encode64(row.custgrp);
                    var custstatus = this.utilService.encode64(row.status);
                    var custtype = this.utilService.encode64(row.custtype);
                    var latitude = this.utilService.encode64(row.latitude);
                    var longitude = this.utilService.encode64(row.longitude);
                    var city = this.utilService.encode64(row.city);
                    var channeltype1 = this.utilService.encode64(row.BRSCH_TEXT);
                    var channeltype2 = this.utilService.encode64(row.BRAN1_TEXT);
                    var territory = this.utilService.encode64(row.VKGRP_TEXT);
                    var parentgroup = this.utilService.encode64(row.KATR7_TEXT);
                    var website = this.utilService.encode64(row.website);
                    var zterm = this.utilService.encode64(row.zterm);
                    var emailid = this.utilService.encode64(row.EMAIL);
                    var cflag = this.utilService.encode64(row.cflag);
                    var billto = this.utilService.encode64(row.billto==''?row.kunnr:row.billto);
                    var type = this.utilService.encode64('c');//this.utilService.encode64(row.type.trim().toLowerCase());

                    this.databaseService.insertIntoTableQuery('customermst',
                    'typeid,pernr,kunnr,name1,address,custclass,branch,chain,popclass,custgrp,custstatus,custtype,latitude,longitude,'+
                    'abcclass,city,channeltype1,channeltype2,territory,parentgroup,outletname,website,zterm,emailid,cflag,type,billto',
                    [typeid,pernr,kunnr,name1,address,custclass,branch,chain,popclass,custgrp,custstatus,custtype,latitude,longitude,
                    abcclass,city,channeltype1,channeltype2,territory,parentgroup,outletname,website,zterm,emailid,cflag,type,billto],i)
                    .then((resobj) => {
                        console.log(JSON.stringify(resobj));
                    }, (err) => {
                        console.log(JSON.stringify(err));
                    });
                    if(i == _len-1) this.insertCustomers(link, row['typeid'], resolve, reject);
                }
            }

        }, (err) => {
            console.log((err));
            reject(false);
        });
    }
  	callCustCredit(typeid1,typeid2){
        return new Promise((resolve, reject) => {
            this.pernr = this.sharedService.getPernr();
            let className = this.sharedService.getAPIObj('credit');
            // let pernr = this.utilService.encode64(this.pernr);
            let link = this.ip+className;
            var obj1 = {typeid:0,isLast:false};
            var obj2 = {typeid:0,isLast:false};
            this.callCustCreditAPI(link,obj1,obj2, resolve, reject);
        });
  	}
    callCustCreditAPI(link,obj1,obj2,resolve,reject){
        // console.log(resolve);
        let action = '?pernr='+this.pernr+'&typeid1='+obj1['typeid']+'&typeid2='+obj2['typeid'];
        this.apiRequestService.getAPI(link+action).then((data) => {
            // console.log(JSON.stringify(data));
            this.populateCustCredit(link,obj1,obj2,resolve,reject,data['masters']);
        }, (err) => {
            console.log((err));
            reject(false);
        });
    }
    populateCustCredit(link,obj1,obj2,resolve,reject,data){
        var d1 = this.InsertIntoCustCreditTable(data['custcreditmst'],obj1);
    	var d2 = this.InsertIntoCustCreditLimitTable(data['custcreditlimitmst'],obj2);
        Observable.forkJoin([d1, d2]).subscribe(t=> {
            console.log(t);
            if(t[0]['isLast'] && t[1]['isLast']) resolve(true);
            else this.callCustCreditAPI(link, t[0],t[1],resolve,reject);
        });

    }
    InsertIntoCustCreditTable(data,obj){
        return new Promise((resolve, reject) => {
            var _len = data.length;
            let epernr = this.utilService.encode64(this.pernr);
            if(obj['typeid']==0) this.databaseService.deleteTableQuery('custcreditmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
            if(_len == 0){
                obj.isLast = true;
                resolve(obj);
            }
            else{
                for (var i = 0; i < _len; i++)
                {
                    var row = data[i];
                    var pernr = epernr;
                    var kunnr = this.utilService.encode64(row.kunnr);
                    var invno = this.utilService.encode64(row.invno);
                    var invdate = (row.invdate);
                    var invdatetime = this.utilService.returnDateTime(this.utilService.formatDateToDatabaseFormat(row.invdate)+' 00:00:00.00',false);
                    // console.log(invdatetime);
                    var invamount = this.utilService.encode64(row.invamount);
                    var amountrec = this.utilService.encode64((row.amountrec));
                    var date = (row.date);
                    var duedate = (row.duedate);
                    var balance = this.utilService.encode64(row.balance);

                    this.databaseService.insertIntoTableQuery('custcreditmst',
                    'kunnr, invno,invdate,invamount,amountrec,date,balance,duedate,invdatetime,pernr',
                    [kunnr, invno,invdate,invamount,amountrec,date,balance,duedate,invdatetime,pernr],i)
                    .then((resobj) => {
                         console.log('custcreditmst '+JSON.stringify(resobj));
                    }, (err) => {
                        console.log(JSON.stringify(err));
                    });
                    if(i == _len-1) {obj.typeid = row['typeid'] ;resolve(obj)};
                }
            }
        });
    }
    InsertIntoCustCreditLimitTable(data,obj){
        return new Promise((resolve, reject) => {
            var _len = data.length;
            let epernr = this.utilService.encode64(this.pernr);
            if(obj['typeid']==0) this.databaseService.deleteTableQuery('custcreditlimitmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
            if(_len == 0){
                obj.isLast = true;
                resolve(obj);
            }
            else{
                for (var i = 0; i < _len; i++)
                {
                    var row = data[i];
                    var pernr = epernr;
                    var kunnr = this.utilService.encode64(row.kunnr);
                    var creditlimit = this.utilService.encode64(row.creditlimit);
                    var used = this.utilService.encode64((row.used));
                    var receivable = this.utilService.encode64(row.receivable);

                    this.databaseService.insertIntoTableQuery('custcreditlimitmst',
                    'kunnr,pernr,creditlimit,used,receivable',
                    [kunnr,pernr,creditlimit,used,receivable],i)
                    .then((resobj) => {
                         console.log('custcreditlimitmst '+JSON.stringify(resobj));
                    }, (err) => {
                        console.log(JSON.stringify(err));
                    });
                    if(i == _len-1) {obj.typeid = row['typeid'] ;resolve(obj)};
                }
            }
        });
    }
  	callCustSOInvDetails(typeid1,typeid2){
        return new Promise((resolve, reject) => {
            this.pernr = this.sharedService.getPernr();
            let className = this.sharedService.getAPIObj('sodetails');
            // let pernr = this.utilService.encode64(this.pernr);
            let link = this.ip+className;
            var obj1 = {typeid:0,isLast:false};
            var obj2 = {typeid:0,isLast:false};
            this.callCustSOInvDetailsAPI(link,obj1,obj2, resolve, reject);
        });
  	}
    callCustSOInvDetailsAPI(link,obj1,obj2,resolve,reject){
        // console.log(resolve);
        let action = '?pernr='+this.pernr+'&typeid1='+obj1['typeid']+'&typeid2='+obj2['typeid'];
        this.apiRequestService.getAPI(link+action).then((data) => {
            // console.log(JSON.stringify(data));
            this.populateCustSOInvDetails(link,obj1,obj2,resolve,reject,data['masters']);
        }, (err) => {
            console.log((err));
            reject(false);
        });
    }
    populateCustSOInvDetails(link,obj1,obj2,resolve,reject,data){
        var d1 = this.InsertIntoCustSODetailsTable(data['sodetailsmst'],obj1);
    	var d2 = this.InsertIntoCustInvDetailsTable(data['invdetailsmst'],obj2);
        Observable.forkJoin([d1, d2]).subscribe(t=> {
            console.log(t);
            if(t[0]['isLast'] && t[1]['isLast']) resolve(true);
            else this.callCustSOInvDetailsAPI(link, t[0],t[1],resolve,reject);
        });

    }
    InsertIntoCustSODetailsTable(data,obj){
        return new Promise((resolve, reject) => {
            var _len = data.length;
            let epernr = this.utilService.encode64(this.pernr);
            if(obj['typeid']==0) this.databaseService.deleteTableQuery('sodetailsmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
            if(_len == 0){
                obj.isLast = true;
                resolve(obj);
            }
            else{
                for (var i = 0; i < _len; i++)
                {
                    var row = data[i];
                    var pernr = epernr;
                    var kunnr = this.utilService.encode64(row.kunnr);
                    var vbeln = this.utilService.encode64(row.vbeln);
                    var vbelni = this.utilService.encode64(row.vbelni);
                    var sodate = (row.sodate);
                    var invdate = (row.invdate);
                    var ponumber = this.utilService.encode64(row.ebeln);
                    var orderqty = this.utilService.encode64((row.kwmeng));
                    var delqty = this.utilService.encode64(row.rfmng);

                    this.databaseService.insertIntoTableQuery('sodetailsmst',
                    'kunnr,vbeln,sodate,vbelni,invdate,ponumber,orderqty,delqty,pernr',
                    [kunnr,vbeln,sodate,vbelni,invdate,ponumber,orderqty,delqty,pernr],i)
                    .then((resobj) => {
                         console.log('sodetailsmst '+JSON.stringify(resobj));
                    }, (err) => {
                        console.log(JSON.stringify(err));
                    });
                    if(i == _len-1) {obj.typeid = row['typeid'] ;resolve(obj)};
                }
            }
        });
    }
    InsertIntoCustInvDetailsTable(data,obj){
        return new Promise((resolve, reject) => {
            var _len = data.length;
            let epernr = this.utilService.encode64(this.pernr);
            if(obj['typeid']==0) this.databaseService.deleteTableQuery('invdetailsmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
            if(_len == 0){
                obj.isLast = true;
                resolve(obj);
            }
            else{
                for (var i = 0; i < _len; i++)
                {
                    var row = data[i];
                    var pernr = epernr;
                    var vbelnf = this.utilService.encode64(row.vbelnf);
                    var vbelni = this.utilService.encode64(row.vbelni);
                    var matnr = this.utilService.encode64(row.matnr);
                    var qtyuom = this.utilService.encode64(row.qtyuom);
                    var invdate = (row.invdate);
                    var qty = this.utilService.encode64((row.qty));
                    var maktx = this.utilService.encode64(row.description);
                    var netwr = this.utilService.encode64((row.netwr));
                    var recqty = this.utilService.encode64(row.recqty);
                    var podstatus = this.utilService.encode64("null");

                    this.databaseService.insertIntoTableQuery('invdetailsmst',
                    'vbelnf, vbelni,matnr,qtyuom,invdate,qty,maktx,recqty,podstatus,netwr,pernr',
                    [vbelnf, vbelni,matnr,qtyuom,invdate,qty,maktx,recqty,podstatus,netwr,pernr],i)
                    .then((resobj) => {
                         console.log('invdetailsmst '+JSON.stringify(resobj));
                    }, (err) => {
                        console.log(JSON.stringify(err));
                    });
                    if(i == _len-1) {obj.typeid = row['typeid'] ;resolve(obj)};
                }
            }
        });
    }
    callCustomerContact(lasttypeid){
        return new Promise((resolve, reject) => {
            this.pernr = this.sharedService.getPernr();
            let className = this.sharedService.getAPIObj('custcontact');
            // let pernr = this.utilService.encode64(this.pernr);
            let link = this.ip+className;
            this.InsertIntoCustomerContact(link, lasttypeid, resolve, reject);
        });
  	}
    InsertIntoCustomerContact(link, lasttypeid, resolve, reject){
        // console.log(resolve);
        link = 'http://212.118.101.174:8081/bsalesfs/GetCustomerContactDetails.do';
        let action = '?pernr='+this.pernr+'&typeid='+lasttypeid;
        this.apiRequestService.getAPI(link+action).then((data) => {
            // console.log(JSON.stringify(data));
            var _len = data['customercontactmst'].length;
            let epernr = this.utilService.encode64(this.pernr);
            if(lasttypeid==0) this.databaseService.deleteTableQuery('customercontactmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
            if(_len == 0){
                resolve(true);
            }
            else{
                for (var i = 0; i < _len; i++)
                {
                    var row = data['customercontactmst'][i];
                    var pernr = epernr;
                    var typeid = (row.appid);
                    var kunnr = this.utilService.encode64(row.kunnr);
                    var name = this.utilService.encode64(row.name);
                    var designation = this.utilService.encode64(row.designation);
                    var mobileno = this.utilService.encode64(row.mobileno);
                    var emailid = this.utilService.encode64(row.emailid);
                    var tel = this.utilService.encode64(row.tel);
                    var fax = this.utilService.encode64(row.fax);
                    var photo = this.utilService.encode64(row.path);
                    var datetime = (row.datetime);
                    var sendflag = this.utilService.encode64('N');

                    this.databaseService.insertIntoTableQuery('customercontactmst',
                    'typeid,kunnr, name,designation,mobileno,emailid,photo,pernr,tel,fax,sendflag,datetime',
                    [typeid,kunnr, name,designation,mobileno,emailid,photo,pernr,tel,fax,sendflag,datetime],i)
                    .then((resobj) => {
                        console.log('customercontactmst '+JSON.stringify(resobj));
                    }, (err) => {
                        console.log(JSON.stringify(err));
                    });
                    if(i == _len-1) this.InsertIntoCustomerContact(link, row['typeid'], resolve, reject);
                }
            }

        }, (err) => {
            console.log((err));
            reject(false);
        });
    }
  	callCustomerAssetMaster(typeid1,typeid2){
        return new Promise((resolve, reject) => {
            this.pernr = this.sharedService.getPernr();
            let className = this.sharedService.getAPIObj('custasset');
            // let pernr = this.utilService.encode64(this.pernr);
            let link = this.ip+className;
            var obj1 = {typeid:0,isLast:false};
            var obj2 = {typeid:0,isLast:false};
            var obj3 = {typeid:0,isLast:false};
            this.callCustomerAssetMasterAPI(link,obj1,obj2,obj3, resolve, reject);
        });
  	}
    callCustomerAssetMasterAPI(link,obj1,obj2,obj3,resolve,reject){
        // console.log(resolve);
        let action = '?pernr='+this.pernr+'&typeid1='+obj1['typeid']+'&typeid2='+obj2['typeid'];
        this.apiRequestService.getAPI(link+action).then((data) => {
            // console.log(JSON.stringify(data));
            this.populateCustomerAssetMaster(link,obj1,obj2,obj3,resolve,reject,data['masters']);
        }, (err) => {
            console.log((err));
            reject(false);
        });
    }
    populateCustomerAssetMaster(link,obj1,obj2,obj3,resolve,reject,data){
        var d1 = this.InsertIntoCustAssetTable(data['custassetsmst'],obj1);
    	var d2 = this.InsertIntoAssetTable(data['assetmst'],obj2);
    	var d3 = this.InsertIntoCustAssetStatusTable(data['custassetstatusmst'],obj3);
        Observable.forkJoin([d1, d2, d3]).subscribe(t=> {
            console.log(t);
            if(t[0]['isLast'] && t[1]['isLast'] && t[2]['isLast']) resolve(true);
            else this.callCustomerAssetMasterAPI(link, t[0],t[1],t[2],resolve,reject);
        });

    }
    InsertIntoCustAssetTable(data,obj){
        return new Promise((resolve, reject) => {
            var _len = data.length;
            let epernr = this.utilService.encode64(this.pernr);
            // if(obj['typeid']==0) this.databaseService.deleteTableQuery('sodetailsmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
            if(_len == 0){
                obj.isLast = true;
                resolve(obj);
            }
            else{
                for (var i = 0; i < _len; i++)
                {
                    var selrow = data[i];
                    var pernr = epernr;
                    this.databaseService.selectTableQuery('custassetsmst','distinct kunnr,serialno',' where serialno=? and pernr= ?',
                    [this.utilService.encode64(selrow.kunnr),pernr],i).then((resobj) => {
                        var index = resobj['index'];
                        var row = data[index];
                        var pernr = epernr;
                        var kunnr = this.utilService.encode64(row.kunnr);
                        var typeid = this.utilService.encode64(row.typeid);
                        var asset = this.utilService.encode64(row.asset);
                        var instdate = (row.instdate);
                        var serialno = this.utilService.encode64(row.serialno);
                        var location = this.utilService.encode64((row.location));
                        var statusid = this.utilService.encode64(row.status);

                        if(resobj['rows'].length != 0){
                            this.databaseService.updateTableQuery('custassetsmst',
                            'typeid=?, kunnr=?, asset=?, instdate=?,location=?,statusid=?',
                            'WHERE serialno=? and pernr= ?',
                            [typeid, kunnr, asset, instdate,location,statusid,serialno,pernr],i)
                            .then((resobj) => {
                                 console.log('custassetsmst '+JSON.stringify(resobj));
                            }, (err) => {
                                console.log(JSON.stringify(err));
                            });
                        }
                        else{
                            this.databaseService.insertIntoTableQuery('custassetsmst',
                            'typeid, kunnr, asset, instdate,location,statusid, serialno,pernr',
                            [typeid, kunnr, asset, instdate,location,statusid, serialno,pernr],i)
                            .then((resobj) => {
                                 console.log('custassetsmst '+JSON.stringify(resobj));
                            }, (err) => {
                                console.log(JSON.stringify(err));
                            });
                        }
                        if(index == _len-1) {obj.typeid = row['typeid'] ;resolve(obj)};
                    },(err) => {});
                }
            }
        });
    }
    InsertIntoAssetTable(data,obj){
        return new Promise((resolve, reject) => {
            var _len = data.length;
            let epernr = this.utilService.encode64(this.pernr);
            if(obj['typeid']==0) this.databaseService.deleteTableQuery('assetmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
            if(_len == 0){
                obj.isLast = true;
                resolve(obj);
            }
            else{
                for (var i = 0; i < _len; i++)
                {
                    var row = data[i];
                    var pernr = epernr;
                    var typeid = this.utilService.encode64(row.typeid);
                    var value = this.utilService.encode64(row.value);

                    this.databaseService.insertIntoTableQuery('assetmst',
                    'typeid, value,pernr',
                    [typeid, value,pernr],i)
                    .then((resobj) => {
                         console.log('assetmst '+JSON.stringify(resobj));
                    }, (err) => {
                        console.log(JSON.stringify(err));
                    });
                    if(i == _len-1) {obj.typeid = row['typeid'] ;resolve(obj)};
                }
            }
        });
    }
    InsertIntoCustAssetStatusTable(data,obj){
        return new Promise((resolve, reject) => {
            var _len = data.length;
            let epernr = this.utilService.encode64(this.pernr);
            if(obj['isLast']){
                if(obj['typeid']==0) this.databaseService.deleteTableQuery('custassetstatusmst',' where pernr=?',[epernr]).then((resobj) => {},(err) => {});
                if(_len == 0){
                    obj.isLast = true;
                    resolve(obj);
                }
                else{
                    for (var i = 0; i < _len; i++)
                    {
                        var row = data[i];
                        var pernr = epernr;
                        var typeid = this.utilService.encode64(row.typeid);
                        var status = this.utilService.encode64(row.status);

                        this.databaseService.insertIntoTableQuery('custassetstatusmst',
                        'typeid, status,pernr',
                        [typeid, status,pernr],i)
                        .then((resobj) => {
                            console.log('custassetstatusmst '+JSON.stringify(resobj));
                        }, (err) => {
                            console.log(JSON.stringify(err));
                        });
                        if(i == _len-1) {obj.isLast = true; resolve(obj);}
                    }
                }
            }
            else{
                obj.isLast = true;
                resolve(obj);
            }
        });
    }
}
