import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDividerModule, MatListModule, MatToolbarModule } from '@angular/material';

import { HomeComponent } from './home.component';

// import { AutoSizeTextDirective } from '../../directives/autoSizeText.directive';
@NgModule({
	imports: [
		CommonModule,
		MatCardModule,
		MatToolbarModule,
		MatListModule,
		MatDividerModule
	],
	exports: [
		HomeComponent,

		MatCardModule,
		MatToolbarModule,
		MatListModule,
		MatDividerModule
	],
	declarations: [HomeComponent] // AutoSizeTextDirective
})
export class HomeModule {}
