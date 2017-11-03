import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {UtilService} from '../../../../app/services/util.service';

@Component({
	selector: 'article-details',
	templateUrl: 'articledetails.html'
})
export class ArticleDetails {
	selectedArticle : any;
	constructor(private utilService: UtilService, private navParams: NavParams) {
		this.selectedArticle = navParams.get('selectedArticle');
	}
}
