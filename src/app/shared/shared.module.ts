import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterModule } from './footer/footer.module';

// import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		FooterModule,

		// FlexLayoutModule
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		FooterModule,

		// FlexLayoutModule
	]
})
export class SharedModule {}
