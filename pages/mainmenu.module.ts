import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { NgCalendarModule  } from 'ionic2-calendar';

import { Home } from './home/home';
import { SyncModalPage } from './sync/syncmodal';
import { ArticleModule } from './article/list/article.module';
import { ArticleDetailsModule } from './article/details/articledetails.module';
import { CustomerModule } from './customer/list/customer.module';
import { CustomerDetailsModule } from './customer/details/customerdetails.module';
import { SettingsModule } from './settings/settings.module';
import { ChangePasswordModule } from './changepassword/changepassword.module';
//import { Diary } from './diary/diary.component';
import { DiaryModule } from './diary/diary.module';

@NgModule({
	declarations: [
		Home,
		SyncModalPage,
		//Diary
	],
	imports: [
		NgCalendarModule,
		IonicModule.forRoot(Home),
		ArticleModule,
		ArticleDetailsModule,
		CustomerModule,
		CustomerDetailsModule,
		SettingsModule,
		ChangePasswordModule,
		DiaryModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		Home,
		SyncModalPage,
		//Diary
	],
	providers: []
})
export class MainMenuModule {}
