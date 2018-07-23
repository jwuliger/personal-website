import { Component, OnInit } from '@angular/core';

// import { GlobalStateService } from '../../services/global-state.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [
		'./home.component.scss'
	]
})
export class HomeComponent implements OnInit {
	// constructor(public readonly stateService: GlobalStateService) {}

	constructor() {}

	ngOnInit() {}
}
