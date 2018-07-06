import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable( {
	providedIn: 'root'
} )
export class SeoService {
	constructor( private meta: Meta, private titleService: Title ) {}

	generateTags( tags? ) {

		// defaults
		tags = {
			title: 'Jared Wuliger | Software Architect',
			description: 'My description...',
			image: 'https://angular.io/assets/images/logos/angular/angular.png',
			slug: '',
			...tags
		};

		// Set a title
		this.titleService.setTitle(tags.title);

		// Set meta tags
		this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
		this.meta.updateTag({
			name: 'twitter:site',
			content: '@jwuliger'
		});
		this.meta.updateTag({ name: 'twitter:title', content: tags.title });
		this.meta.updateTag({
			name: 'twitter:description',
			content: tags.description
		});
		this.meta.updateTag({ name: 'twitter:image', content: tags.image });

		this.meta.updateTag({ property: 'og:type', content: 'article' });
		this.meta.updateTag({
			property: 'og:site_name',
			content: 'Jared Wuliger | Software Architect'
		});
		this.meta.updateTag({ property: 'og:title', content: tags.title });
		this.meta.updateTag({
			property: 'og:description',
			content: tags.description
		});
		this.meta.updateTag({ property: 'og:image', content: tags.image });
		this.meta.updateTag({
			property: 'og:url',
			content: `https://jmw-ai.firebaseapp.com/${tags.slug}`
		});
	}
}
