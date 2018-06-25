import { NgModule, Optional, SkipSelf } from '@angular/core';

// import { AuthGuard } from './services/auth.guard';
// import { AuthService } from './services/auth.service';

@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	// providers: [ AuthService, AuthGuard ]
})
export class CoreModule {
	constructor( @Optional() @SkipSelf() parentModule: CoreModule ) {
		if ( parentModule ) {
			throw new Error( 'CoreModule is already loaded. Import it in the AppModule only!' );
		}
	}
}
