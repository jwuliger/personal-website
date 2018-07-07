import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';

import { SeoService } from './services/seo.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [
		'./app.component.scss'
	]
})
export class AppComponent implements OnInit {
	constructor(private seo: SeoService, router: Router) {
		// let previousRoute = router.routerState.snapshot.url;

		// router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((data: NavigationEnd) => {
		// 	this.resetScrollPosition();
		// 	previousRoute = data.urlAfterRedirects;
		// });

		this.resetScrollPosition();
	}

	resetScrollPosition() {
		if ( typeof document === 'object' && document ) {
			const sidenavContent = document.querySelector( '.mat-drawer-content' );
			if ( sidenavContent ) {
				sidenavContent.scrollTop = 0;
			}
		}
	}

	getTitle() {
		return this.seo.title;
	}

	ngOnInit() {}
}
