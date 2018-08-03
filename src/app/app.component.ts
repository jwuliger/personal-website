import { Component, OnInit } from '@angular/core';

import { SeoService } from './services/seo.service';
import { fadeAnimation } from './app-animations';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
	constructor(
		private seo: SeoService // private router: Router
	) {}

	ngOnInit() {}

	getTitle() {
		return this.seo.title;
	}
}
