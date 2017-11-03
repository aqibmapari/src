import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { NgCalendarModule  } from 'ionic2-calendar';

import { SharedModule } from '../../app/shared.module';
import { Diary } from './diary.component';
import { DiaryDay } from './diaryDay/diaryDay.component';
import { DiaryWeek } from './diaryWeek/diaryWeek.component';
import { DiaryMonth } from './diaryMonth/diaryMonth.component';
import { DiaryCalendar } from './diaryCalendar/diaryCalendar.component';
import { DiaryList } from './diaryList/diaryList.component';
import { DiaryRoutePlan } from './diaryRoutePlan/diaryRoutePlan.component';

@NgModule({
    declarations: [
        Diary,
        DiaryDay,
        DiaryWeek,
        DiaryMonth,
		DiaryCalendar,
        DiaryList,
        DiaryRoutePlan
    ],
    imports: [
		NgCalendarModule,
        IonicModule.forRoot(Diary),
        SharedModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        Diary,
        DiaryDay,
        DiaryWeek,
        DiaryMonth,
		DiaryCalendar,
        DiaryList,
        DiaryRoutePlan
    ],
    providers: []
})
export class DiaryModule {}
