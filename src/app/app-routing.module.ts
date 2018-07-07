import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		pathMatch: 'full',
		data: {}
	},
	{
		path: 'code-lab',
		loadChildren: './pages/code-lab/code-lab.module#CodeLabModule',
		pathMatch: 'full',
		data: {}
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}
