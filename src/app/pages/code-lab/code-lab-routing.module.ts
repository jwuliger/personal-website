import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CodeLabComponent } from './code-lab.component';

const routes: Routes = [
	{
		path: '',
		component: CodeLabComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class CodeLabRoutingModule {}
