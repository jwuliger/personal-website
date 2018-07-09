import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatDividerModule, MatListModule, MatToolbarModule } from '@angular/material';

import { SharedModule } from './../../shared/shared.module';
import { CodeLabRoutingModule } from './code-lab-routing.module';
import { CodeLabComponent } from './code-lab.component';

@NgModule({
	imports: [
		SharedModule,

		MatCardModule,
		MatToolbarModule,
		MatListModule,
		MatDividerModule,

		CodeLabRoutingModule
	],
	declarations: [
		CodeLabComponent
	]
})
export class CodeLabModule {}
