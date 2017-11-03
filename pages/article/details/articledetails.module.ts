import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import {SharedModule} from '../../../app/shared.module';
import { ArticleDetailsHeader } from './articledetailsheader.component';
import { ArticleDetails } from './articledetails/articledetails.component';
import {ArticleAttributes} from './attributes/articleattributes.component';
import {ArticlePicture} from './picture/articlepicture.component';
import {ArticleVideos} from './videos/articlevideos.component';
import {ArticleSpecifications} from './specifications/articlespecifications.component';
import {ArticleApplications} from './applications/articleapplications.component';
import {ArticleBenefits} from './benefits/articlebenefits.component';

@NgModule({
  declarations: [
    ArticleDetailsHeader,
	ArticleDetails,
	ArticleAttributes,
	ArticlePicture,
	ArticleVideos,
	ArticleSpecifications,
	ArticleApplications,
	ArticleBenefits
  ],
  imports: [
    IonicModule.forRoot(ArticleDetailsHeader),
	SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ArticleDetailsHeader,
	ArticleDetails,
	ArticleAttributes,
	ArticlePicture,
	ArticleVideos,
	ArticleSpecifications,
	ArticleApplications,
	ArticleBenefits
  ],
  providers: []
})
export class ArticleDetailsModule {}
