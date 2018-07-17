import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './navbar.component';

@NgModule({
	imports: [
		MatToolbarModule,
		MatButtonModule,

		RouterModule,
		CommonModule
	],
	exports: [
		NavBarComponent
	],
	declarations: [
		NavBarComponent
	]
})
export class NavBarModule {}
