import { Component, OnInit, OnDestroy } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';

import { SeoService } from '../../services/seo.service';
import { Observable } from 'rxjs';

const DATA = makeStateKey<any>('contacts');

let contacts$: Observable<any> = null;

@Component({
	selector: 'app-code-lab',
	templateUrl: './code-lab.component.html',
	styleUrls: ['./code-lab.component.scss']
})
export class CodeLabComponent implements OnInit, OnDestroy {
	// https://randomuser.me

	public contacts;

	constructor(
		public afs: AngularFirestore,
		private state: TransferState,
		private seo: SeoService
	) {}

	ngOnInit() {
		// set metatags
		this.seo.title = 'Code Lab';
		this.seo.generateTags();

		// Get the contacts from the database
		contacts$ = this.afs.collection('contacts').valueChanges();

		// If 'state' is available, start with it as an observable
		const exists = this.state.get(DATA, [] as any);
		if (!exists.length) {
			contacts$
				.pipe(
					tap(list => {
						this.state.set(DATA, list);
						this.contacts = list;
					})
				)
				.subscribe();
		} else {
			this.contacts = exists;
		}
	}

	ngOnDestroy() {
		contacts$ = null;
	}
}
