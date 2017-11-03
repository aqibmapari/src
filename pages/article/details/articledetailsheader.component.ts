import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {ArticleDetails} from './articledetails/articledetails.component';
import {ArticleAttributes} from './attributes/articleattributes.component';
import {ArticlePicture} from './picture/articlepicture.component';
import {ArticleVideos} from './videos/articlevideos.component';
import {ArticleSpecifications} from './specifications/articlespecifications.component';
import {ArticleApplications} from './applications/articleapplications.component';
import {ArticleBenefits} from './benefits/articlebenefits.component';

@Component({
	selector: 'page-articledetails',
	templateUrl: 'articledetailsheader.html'
})
export class ArticleDetailsHeader {
	tabs: Array<{title: string,value: string, root: any, icon: string}>;
	segmentModel: string;
	constructor(public navCtrl: NavController) {
		this.tabs = [
			{ title: "Article",value:"article", root: ArticleDetails, icon: "calendar" },
			{ title: "Attributes",value:"attributes", root: ArticleAttributes, icon: "calendar" },
			{ title: "Picture",value:"picture", root: ArticlePicture, icon: "calendar" },
			{ title: "Videos",value:"videos", root: ArticleVideos, icon: "calendar" },
			{ title: "Specifications",value:"specifications", root: ArticleSpecifications, icon: "calendar" },
			{ title: "Applications",value:"applications", root: ArticleApplications, icon: "calendar" },
			{ title: "Benefits",value:"benefits", root: ArticleBenefits, icon: "calendar" }
		];
		this.segmentModel = "article";
	}
	segmentValueChange(value:string):void {
		//console.log(value);
		this.segmentModel = value;
	}
}
