// import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
// import { NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs/operators';

import { SeoService } from './services/seo.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [
		'./app.component.scss'
	]
})
export class AppComponent implements OnInit {

	constructor(
		@Inject(PLATFORM_ID) protected platformId: Object,
		private seo: SeoService,
		private router: Router
	) {
		// Only run this code on the client (TODO: Use a different implementation that accounts for pre-rendering)
		// if (isPlatformBrowser(this.platformId)) {
		// 	let previousRoute = this.router.routerState.snapshot.url;
		// 	this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((data: NavigationEnd) => {
		// 		this.resetScrollPosition();
		// 		previousRoute = data.urlAfterRedirects;
		// 	});
		// }
	}

	ngOnInit() {
	}

	resetScrollPosition() {
		if (typeof document === 'object' && document) {
			(window as any).scroll(0, 0);
		}
	}

	getTitle() {
		return this.seo.title;
	}
}
