import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';

import { SharedModule } from './../../shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
	imports: [
		SharedModule,
		MatCardModule
	],
	exports: [
		HomeComponent,
		MatCardModule
	],
	declarations: [
		HomeComponent
	]
})
export class HomeModule {}
