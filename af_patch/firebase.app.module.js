import { InjectionToken, NgModule, Optional } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/app';
export var FirebaseOptionsToken = new InjectionToken(
	'angularfire2.app.options'
);
export var FirebaseNameOrConfigToken = new InjectionToken(
	'angularfire2.app.nameOrConfig'
);
var FirebaseApp = (function() {
	function FirebaseApp() {}
	return FirebaseApp;
})();
export { FirebaseApp };
export function _firebaseAppFactory(options, nameOrConfig) {
	var name =
		(typeof nameOrConfig === 'string' && nameOrConfig) || '[DEFAULT]';
	var config = (typeof nameOrConfig === 'object' && nameOrConfig) || {};
	config.name = config.name || name;
	var existingApp = firebase.apps.filter(function(app) {
		return app && app.name === config.name;
	})[0];
	return existingApp || firebase.initializeApp(options, config);
}
var FirebaseAppProvider = {
	provide: FirebaseApp,
	useFactory: _firebaseAppFactory,
	deps: [FirebaseOptionsToken, [new Optional(), FirebaseNameOrConfigToken]]
};
var AngularFireModule = (function() {
	function AngularFireModule() {}
	AngularFireModule.initializeApp = function(options, nameOrConfig) {
		return {
			ngModule: AngularFireModule,
			providers: [
				{
					provide: FirebaseOptionsToken,
					useValue: options
				},
				{
					provide: FirebaseNameOrConfigToken,
					useValue: nameOrConfig
				}
			]
		};
	};
	AngularFireModule.decorators = [
		{
			type: NgModule,
			args: [
				{
					providers: [FirebaseAppProvider]
				}
			]
		}
	];
	return AngularFireModule;
})();
export { AngularFireModule };
//# sourceMappingURL=firebase.app.module.js.map
