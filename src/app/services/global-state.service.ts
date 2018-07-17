import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GlobalStateService {
	public isPlatformBrowser: boolean;

	constructor(@Inject(PLATFORM_ID) private platformId: Object) {
		this.isPlatformBrowser = isPlatformBrowser(platformId);

		const platformInfo: string = isPlatformBrowser(this.platformId) ? 'in the browser' : 'on the server';

		console.log(`Running ${ platformInfo} `);
	}
}
