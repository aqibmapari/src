import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import {SharedModule} from '../../../app/shared.module';
import { Article } from './article.component';
import { ArticleList } from './articlelist/articlelist.component';

@NgModule({
  declarations: [
    Article,
	ArticleList
  ],
  imports: [
    IonicModule.forRoot(Article),
	SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Article,
	ArticleList
  ],
  providers: []
})
export class ArticleModule {}
