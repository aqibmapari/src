import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { NgCalendarModule  } from 'ionic2-calendar';

import { SharedService } from './services/sharedservice';
import { UtilService } from './services/util.service';
import { DatabaseService } from './services/database.service';
import { APIRequestService } from './services/apirequest.service';
import { AfterLoginAPIService } from './services/afterloginapi.service';
import { MasterSyncAPIService } from './services/mastersyncapi.service';
import { CreateAllTablesService } from './services/createtables.service';
import { CustomerSyncAPIService } from './services/customersyncapi.service';
import { VisitSyncAPIService } from './services/visitsyncapi.service';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { MainMenuModule } from '../pages/mainmenu.module';

@NgModule({
    declarations: [
        Login,
        MyApp
	],
    imports: [
		NgCalendarModule,
		BrowserModule,
		HttpModule,
        IonicModule.forRoot(MyApp),
        MainMenuModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        Login,
        MyApp
	],
    providers: [
        SharedService,
        UtilService,
        DatabaseService,
        APIRequestService,
        AfterLoginAPIService,
        CreateAllTablesService,
        MasterSyncAPIService,
        CustomerSyncAPIService,
        VisitSyncAPIService
    ]
})
export class AppModule {}
