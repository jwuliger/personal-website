import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

const DATA = makeStateKey<any>('contacts');

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [
		'./app.component.scss'
	]
})
export class AppComponent implements OnInit, OnDestroy {

	public contacts;

	constructor(
		public afs: AngularFirestore,
		private meta: Meta,
		private titleService: Title,
		private state: TransferState
	) {}

	ngOnInit() {
		// set metatags for twitter
		this.setMetaTags();

		// Get the contacts from the database
		const contacts$ = this.afs.collection('contacts').valueChanges();

		// If 'state' is available, start with it as an observable
		const exists = this.state.get(DATA, [] as any);
		if (!exists.length) {
			contacts$
				.pipe(
					tap((list) => {
						this.state.set(DATA, list);
						this.contacts = list;
					})
				)
				.subscribe();
		} else {
			this.contacts = exists;
		}
	}

	ngOnDestroy(): void {
		this.contacts = null;
		this.titleService = null;
	}

	// Just an example. Will be it's own service.
	setMetaTags() {
		this.titleService.setTitle('Jared Wuliger\'s Website');

		// Set twitter meta tags
		this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
		this.meta.updateTag({
			name: 'twitter:site',
			content: '@jwuliger'
		});
		this.meta.updateTag({
			name: 'twitter:title',
			content: 'Jared Wuliger\'s Website (WIP)'
		});
		this.meta.updateTag({
			name: 'twitter:description',
			content:
				// tslint:disable-next-line:max-line-length
				'A server-rendered list of data from Firebase Cloud Firestore and Angular Universal (When Angularfire2 is fixed...)'
		});
		this.meta.updateTag({
			name: 'twitter:image',
			content:
				'https://angular.io/assets/images/logos/angular/angular.png'
		});
	}
}
