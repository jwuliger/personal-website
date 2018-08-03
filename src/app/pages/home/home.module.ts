import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
	imports: [SharedModule, MatCardModule, MatButtonModule],
	exports: [HomeComponent, MatCardModule, MatButtonModule],
	declarations: [HomeComponent]
})
export class HomeModule {}
