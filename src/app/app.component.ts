import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
	contacts$: Observable<any[]>;

	constructor(private afs: AngularFirestore) {
		this.contacts$ = this.afs.collection('contacts').valueChanges();
	}
}
