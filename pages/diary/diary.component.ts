import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/*import { DiaryDay } from './diaryDay/diaryDay.component';
import { DiaryWeek } from './diaryWeek/diaryWeek.component';
import { DiaryMonth } from './diaryMonth/diaryMonth.component';*/
import { DiaryCalendar } from './diaryCalendar/diaryCalendar.component';
import { DiaryList } from './diaryList/diaryList.component';
import { DiaryRoutePlan } from './diaryRoutePlan/diaryRoutePlan.component';

@Component({
	selector: 'page-diary',
	templateUrl: 'diary.html'
})
export class Diary {
	tabsArticle: Array<{title: string,value: string, root: any, icon: string}>;
	segmentModel: string;
	constructor(public navCtrl: NavController) {
		this.tabsArticle = [
			{ title: "Day", value:"day", root: DiaryCalendar, icon: "calendar" },
			{ title: "Week", value:"week", root: DiaryCalendar, icon: "calendar" },
			{ title: "Month", value:"month", root: DiaryCalendar, icon: "calendar" },
			{ title: "List", value:"list", root: DiaryList, icon: "calendar" },
			{ title: "Route Plan", value:"routePlan", root: DiaryRoutePlan, icon: "calendar" }
		];
		this.segmentModel = "day";
	}
	
	segmentValueChange(value:string):void {
		this.segmentModel = value;
	}
}
