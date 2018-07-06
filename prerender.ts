import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as fs from 'fs-extra';
import { join, resolve } from 'path';

// Load zone.js for the server.
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// Import module map for lazy loading
// Add routes manually that you need rendered
const ROUTES = [
	'/'
];

const APP_NAME = 'jmw-site';

// leave this as require(), imported via webpack
const {
	AppServerModuleNgFactory,
	LAZY_MODULE_MAP
} = require(`./dist/${APP_NAME}-server/main`);

enableProdMode();

async function prerender() {
	// Get the app index
	const browserBuild = `dist/${APP_NAME}`;
	const index = await fs.readFile(join(browserBuild, 'index.html'), 'utf8');

	// Loop over each route
	for (const route of ROUTES) {
		const pageDir = join(browserBuild, route);
		await fs.ensureDir(pageDir);

		// Render with Universal
		const html = await renderModuleFactory(AppServerModuleNgFactory, {
			document: index,
			url: route,
			extraProviders: [
				provideModuleMap(LAZY_MODULE_MAP)
			]
		});

		await fs.writeFile(join(pageDir, 'index.html'), html);
	}

	console.log('done rendering :)');
	process.exit();
}

prerender();
