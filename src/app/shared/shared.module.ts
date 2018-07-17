import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterModule } from './layout/footer/footer.module';
import { NavBarModule } from './layout/navbar/navbar.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		NavBarModule,
		FooterModule,

		FlexLayoutModule
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		NavBarModule,
		FooterModule,

		FlexLayoutModule
	]
})
export class SharedModule {}
