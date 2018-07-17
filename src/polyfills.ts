import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

// Add fake 'window' to global to avoid getting 'undefined' with some packages.
(window as any).global = window;
