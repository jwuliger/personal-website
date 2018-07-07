import { NgModule } from '@angular/core';
import { MatCardModule, MatDividerModule, MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
	declarations: [AppComponent, HomeComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: 'jmwServerApp' }),
		BrowserTransferStateModule,

		AngularFireModule.initializeApp(environment.firebase, 'jmwFirebaseApp'),
		AngularFirestoreModule,
		AngularFireAuthModule,

		AppRoutingModule,
		BrowserAnimationsModule,

		MatCardModule,
		MatToolbarModule,
		MatListModule,
		MatDividerModule,

		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
