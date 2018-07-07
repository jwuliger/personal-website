import { NgModule } from '@angular/core';
import { MatCardModule, MatDividerModule, MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavBarModule } from './shared/navbar/navbar.module';

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

		NavBarModule,
		FooterModule,

		MatCardModule,
		MatToolbarModule,
		MatListModule,
		MatDividerModule,

		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		})
	],
	exports: [
		MatCardModule,
		MatToolbarModule,
		MatListModule,
		MatDividerModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
