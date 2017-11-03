import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {ArticleList} from './articlelist/articlelist.component';

@Component({
	selector: 'page-articlelist',
	templateUrl: 'article.html'
})
export class Article {
	tabsArticle: Array<{title: string,value: string, root: any, icon: string}>;
	segmentModel: string;
	constructor(public navCtrl: NavController) {
		this.tabsArticle = [
			{ title: "Article",value:"list", root: ArticleList, icon: "calendar" }
		];
		this.segmentModel = "list";
	}
	segmentValueChange(value:string):void {
		//console.log(value);
		this.segmentModel = value;
	}

}
