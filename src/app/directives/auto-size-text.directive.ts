// TODO: There has got to be a way to trick ng universal into thinking there is a 'window' object...lol

// import {
//     AfterViewInit,
//     Directive,
//     ElementRef,
//     HostListener,
//     Input,
//     OnChanges,
//     OnInit,
//     Renderer2,
//     SimpleChanges,
// } from '@angular/core';

// @Directive({
// 	selector: '[appAutoSizeText]'
// })
// export class AutoSizeTextDirective implements AfterViewInit, OnInit, OnChanges {
// 	@Input() autoSizeText ? = true;
// 	@Input() compression ? = 1;
// 	@Input() activateOnResize ? = true;
// 	@Input() minFontSize?: number | 'inherit' = 0;
// 	@Input() maxFontSize?: number | 'inherit' = Number.POSITIVE_INFINITY;
// 	@Input() delay ? = 100;
// 	@Input() ngModel;
// 	@Input() fontUnit?: 'px' | 'em' | string = 'px';

// 	private autoSizeTextParent: HTMLElement;
// 	private autoSizeTextElement: HTMLElement;
// 	private autoSizeTextMinFontSize: number;
// 	private autoSizeTextMaxFontSize: number;
// 	private computed: CSSStyleDeclaration;
// 	private newlines: number;
// 	private lineHeight: string;
// 	private display: string;
// 	private calcSize = 10;
// 	private resizeTimeout: number;

// 	constructor(private el: ElementRef, private renderer: Renderer2) {
// 		this.autoSizeTextElement = el.nativeElement;
// 		this.autoSizeTextParent = this.autoSizeTextElement.parentElement;
// 		this.computed = window.getComputedStyle(this.autoSizeTextElement);
// 		this.newlines = this.autoSizeTextElement.childElementCount > 0 ? this.autoSizeTextElement.childElementCount : 1;
// 		this.lineHeight = this.computed['line-height'];
// 		this.display = this.computed['display'];
// 	}

// 	@HostListener('window:resize')
// 	public onWindowResize = (): void => {
// 		if (this.activateOnResize) {
// 			this.setFontSize();
// 		}
// 	}

// 	public ngOnInit() {
// 		this.autoSizeTextMinFontSize = this.minFontSize === 'inherit' ? this.computed['font-size'] : this.minFontSize;
// 		this.autoSizeTextMaxFontSize = this.maxFontSize === 'inherit' ? this.computed['font-size'] : this.maxFontSize;
// 	}

// 	public ngAfterViewInit() {
// 		this.setFontSize();
// 	}

// 	public ngOnChanges(changes: SimpleChanges) {
// 		if (changes['compression'] && !changes['compression'].firstChange) {
// 			this.setFontSize();
// 		}
// 		if (changes['ngModel']) {
// 			this.autoSizeTextElement.innerHTML = this.ngModel;
// 			this.setFontSize();
// 		}
// 	}

// 	private setFontSize = (): void => {
// 		this.resizeTimeout = setTimeout(
// 			(() => {
// 				if (this.autoSizeTextElement.offsetHeight * this.autoSizeTextElement.offsetWidth !== 0) {
// 					// reset to default
// 					this.setStyles(this.calcSize, 1, 'inline-block');
// 					// set new
// 					this.setStyles(this.calculateNewFontSize(), this.lineHeight, this.display);
// 				}
// 			}).bind(this),
// 			this.delay
// 		);
// 	}

// 	private calculateNewFontSize = (): number => {
// 		const ratio = this.calcSize * this.newlines / this.autoSizeTextElement.offsetWidth / this.newlines;

// 		return Math.max(
// 			Math.min(
// 				(this.autoSizeTextParent.offsetWidth -
// 					(parseFloat(getComputedStyle(this.autoSizeTextParent).paddingLeft) +
// 						parseFloat(getComputedStyle(this.autoSizeTextParent).paddingRight)) -
// 					6) *
// 					ratio *
// 					this.compression,
// 				this.autoSizeTextMaxFontSize
// 			),
// 			this.autoSizeTextMinFontSize
// 		);
// 	}

// 	private setStyles = (fontSize: number, lineHeight: number | string, display: string): void => {
// 		this.renderer.setStyle(this.autoSizeTextElement, 'fontSize', fontSize.toString() + this.fontUnit);
// 		this.renderer.setStyle(this.autoSizeTextElement, 'lineHeight', lineHeight.toString());
// 		this.renderer.setStyle(this.autoSizeTextElement, 'display', display);
// 	}
// }
