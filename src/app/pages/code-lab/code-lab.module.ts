import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CodeLabRoutingModule } from './code-lab-routing.module';
import { CodeLabComponent } from './code-lab.component';

@NgModule({
	imports: [
		CommonModule,
		CodeLabRoutingModule
	],
	declarations: [
		CodeLabComponent
	]
})
export class CodeLabModule {}
