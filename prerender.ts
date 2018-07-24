import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as fs from 'fs-extra';
import { join, resolve } from 'path';

import { ROUTES } from 'static.paths';

// DOM libs required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const APP_NAME = 'jmw-site';

// leave this as require(), imported via webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/${APP_NAME}-server/main`);

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

	console.log('Prerender Completed.');
	process.exit();
}

prerender();
