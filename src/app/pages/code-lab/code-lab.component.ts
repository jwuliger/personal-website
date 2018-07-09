import { Component, OnInit } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

import { SeoService } from '../../services/seo.service';

const DATA = makeStateKey<any>( 'contacts' );

@Component({
	selector: 'app-code-lab',
	templateUrl: './code-lab.component.html',
	styleUrls: [
		'./code-lab.component.scss'
	]
})
export class CodeLabComponent implements OnInit {
	public contacts;

	constructor( public afs: AngularFirestore, private state: TransferState, private seo: SeoService ) { }

	ngOnInit() {
		// set metatags
		this.seo.generateTags();

		// Get the contacts from the database
		const contacts$ = this.afs.collection( 'contacts' ).valueChanges();

		// If 'state' is available, start with it as an observable
		const exists = this.state.get( DATA, [] as any );
		if ( !exists.length ) {
			contacts$
				.pipe(
					tap( ( list ) => {
						this.state.set( DATA, list );
						this.contacts = list;
					} )
				)
				.subscribe();
		} else {
			this.contacts = exists;
		}
	}
}
