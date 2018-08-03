import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SharedModule } from '../../shared/shared.module';
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
	declarations: [CodeLabComponent]
})
export class CodeLabModule {}
