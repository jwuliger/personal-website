import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDividerModule, MatListModule, MatToolbarModule } from '@angular/material';

import { SharedModule } from './../../shared/shared.module';
import { HomeComponent } from './home.component';

// import { AutoSizeTextDirective } from '../../directives/autoSizeText.directive';
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
	] // AutoSizeTextDirective
})
export class HomeModule {}
