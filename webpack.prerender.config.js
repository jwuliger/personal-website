/**
 * Static Prerendering (Generative) Method
 */

const path = require('path');
const webpack = require('webpack');

const APP_NAME = 'jmw-site';

module.exports = {
	entry     : { prerender: './prerender.ts' },
	resolve   : {
		extensions : [
			'.js',
			'.ts'
		]
	},
	mode      : 'none', // other options: development & production
	target    : 'node',
	externals : [
		/(node_modules|main\..*\.js)/
	],
	output    : {
		path     : path.join(__dirname, `dist/${APP_NAME}`),
		filename : '[name].js'
	},
	module    : {
		rules : [
			{ test: /\.ts$/, loader: 'ts-loader' },
			{
				// Mark files inside `@angular/core` as using SystemJS style dynamic imports.
				// Removing this will cause deprecation warnings to appear.
				test   : /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
				parser : { system: true }
			}
		]
	},
	plugins   : [
		new webpack.ContextReplacementPlugin(
			/(.+)?angular(\\|\/)core(.+)?/,
			path.join(__dirname, 'src'), // location of your src
			{} // a map of your routes
		),
		new webpack.ContextReplacementPlugin(/(.+)?express(\\|\/)(.+)?/, path.join(__dirname, 'src'), {})
	]
};
