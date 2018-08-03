import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
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
import { HomeModule } from './pages/home/home.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: 'jmwServerApp' }),
		BrowserTransferStateModule,

		AngularFireModule.initializeApp(environment.firebase, 'jmwFirebaseApp'),
		AngularFirestoreModule,
		AngularFireAuthModule,

		AppRoutingModule,
		BrowserAnimationsModule,

		HomeModule,
		SharedModule,

		MatCardModule,
		MatToolbarModule,

		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		})
	],
	exports: [MatCardModule, MatToolbarModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
