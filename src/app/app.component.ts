import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [
		'./app.component.scss'
	]
})
export class AppComponent {
	public contacts$: Observable<any[]>;

	constructor(public afs: AngularFirestore) {
		this.contacts$ = this.afs.collection('contacts').valueChanges();
	}
}
