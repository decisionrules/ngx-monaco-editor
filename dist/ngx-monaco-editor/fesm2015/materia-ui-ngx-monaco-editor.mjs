import * as i0 from '@angular/core';
import { Injectable, Optional, Inject, Directive, EventEmitter, forwardRef, Component, ChangeDetectionStrategy, Input, Output, ViewChild, NgModule } from '@angular/core';
import { takeUntil, filter, take } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { __rest } from 'tslib';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

/// <reference path="monaco.ts" />
const MONACO_PATH = 'MONACO_PATH';

class MonacoEditorLoaderService {
    constructor(ngZone, monacoPathConfig) {
        this.ngZone = ngZone;
        this.monacoPathConfig = monacoPathConfig;
        this.isMonacoLoaded$ = new BehaviorSubject(false);
        this._monacoPath = 'assets/monaco-editor/min/vs';
        if (window.monacoEditorAlreadyInitialized) {
            ngZone.run(() => this.isMonacoLoaded$.next(true));
            return;
        }
        window.monacoEditorAlreadyInitialized = true;
        if (this.monacoPathConfig) {
            this.monacoPath = this.monacoPathConfig;
        }
        this.loadMonaco();
    }
    set monacoPath(value) {
        if (value) {
            this._monacoPath = value;
        }
    }
    loadMonaco() {
        const onGotAmdLoader = () => {
            let vsPath = this._monacoPath;
            window.amdRequire = window.require;
            const isElectron = !!this.nodeRequire;
            const isPathUrl = vsPath.includes('http');
            if (isElectron) {
                // Restore node require in window
                window.require = this.nodeRequire;
                if (!isPathUrl) {
                    const path = window.require('path');
                    vsPath = path.resolve(window.__dirname, this._monacoPath);
                }
            }
            window.amdRequire.config({ paths: { vs: vsPath } });
            // Load monaco
            window.amdRequire(['vs/editor/editor.main'], () => {
                this.ngZone.run(() => this.isMonacoLoaded$.next(true));
            }, (error) => console.error('Error loading monaco-editor: ', error));
        };
        // Check if AMD loader already available
        const isAmdLoaderAvailable = !!window.amdRequire;
        if (isAmdLoaderAvailable) {
            return onGotAmdLoader();
        }
        const isElectron = !!window.require;
        if (isElectron) {
            this.addElectronFixScripts();
            this.nodeRequire = window.require;
        }
        const loaderScript = document.createElement('script');
        loaderScript.type = 'text/javascript';
        loaderScript.src = `${this._monacoPath}/loader.js`;
        loaderScript.addEventListener('load', onGotAmdLoader);
        document.body.appendChild(loaderScript);
    }
    addElectronFixScripts() {
        const electronFixScript = document.createElement('script');
        // workaround monaco-css not understanding the environment
        const inlineScript = document.createTextNode('self.module = undefined;');
        // workaround monaco-typescript not understanding the environment
        const inlineScript2 = document.createTextNode('self.process.browser = true;');
        electronFixScript.appendChild(inlineScript);
        electronFixScript.appendChild(inlineScript2);
        document.body.appendChild(electronFixScript);
    }
}
MonacoEditorLoaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoEditorLoaderService, deps: [{ token: i0.NgZone }, { token: MONACO_PATH, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
MonacoEditorLoaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoEditorLoaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoEditorLoaderService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () {
        return [{ type: i0.NgZone }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [MONACO_PATH]
                    }] }];
    } });

class MonacoEditorLoaderDirective {
    constructor(templateRef, viewContainer, monacoEditorLoaderService) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.monacoEditorLoaderService = monacoEditorLoaderService;
        this.isMonacoLoaded$ = this.monacoEditorLoaderService.isMonacoLoaded$.asObservable();
        this.destroyed$ = new Subject();
    }
    ngOnInit() {
        this.isMonacoLoaded$.pipe(takeUntil(this.destroyed$)).subscribe((loaded) => {
            if (!loaded) {
                return this.viewContainer.clear();
            }
            this.viewContainer.createEmbeddedView(this.templateRef);
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
MonacoEditorLoaderDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoEditorLoaderDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: MonacoEditorLoaderService }], target: i0.ɵɵFactoryTarget.Directive });
MonacoEditorLoaderDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.2", type: MonacoEditorLoaderDirective, selector: "[ngxLoadMonacoEditor]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoEditorLoaderDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ngxLoadMonacoEditor]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: MonacoEditorLoaderService }]; } });

class MonacoEditorComponent {
    constructor(monacoLoader, zone) {
        this.monacoLoader = monacoLoader;
        this.zone = zone;
        this.insideNgZone = false;
        this.init = new EventEmitter();
        this.onTouched = () => {
        };
        this.onErrorStatusChange = () => {
        };
        this.propagateChange = () => {
        };
    }
    get model() {
        return this.editor && this.editor.getModel();
    }
    get modelMarkers() {
        return this.model && monaco.editor.getModelMarkers({
            resource: this.model.uri
        });
    }
    ngOnInit() {
        this.monacoLoader.isMonacoLoaded$.pipe(filter(isLoaded => isLoaded), take(1)).subscribe(() => {
            this.initEditor();
        });
    }
    ngOnChanges(changes) {
        if (this.editor && changes.options && !changes.options.firstChange) {
            const _a = changes.options.currentValue, { language: toLanguage, theme: toTheme } = _a, options = __rest(_a, ["language", "theme"]);
            const { language: fromLanguage, theme: fromTheme } = changes.options.previousValue;
            if (fromLanguage !== toLanguage) {
                monaco.editor.setModelLanguage(this.editor.getModel(), this.options && this.options.language ? this.options.language : 'text');
            }
            if (fromTheme !== toTheme) {
                monaco.editor.setTheme(toTheme);
            }
            this.editor.updateOptions(options);
        }
        if (this.editor && changes.uri) {
            const toUri = changes.uri.currentValue;
            const fromUri = changes.uri.previousValue;
            if (fromUri && !toUri || !fromUri && toUri || toUri && fromUri && toUri.path !== fromUri.path) {
                const value = this.editor.getValue();
                if (this.modelUriInstance) {
                    this.modelUriInstance.dispose();
                }
                let existingModel;
                if (toUri) {
                    existingModel = monaco.editor.getModels().find((model) => model.uri.path === toUri.path);
                }
                this.modelUriInstance = existingModel ? existingModel : monaco.editor.createModel(value, this.options.language || 'text', this.uri);
                this.editor.setModel(this.modelUriInstance);
            }
        }
    }
    writeValue(value) {
        this.value = value;
        if (this.editor && value) {
            this.editor.setValue(value);
        }
        else if (this.editor) {
            this.editor.setValue('');
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    validate() {
        return !this.parsedError ? null : {
            monaco: {
                value: this.parsedError.split('|'),
            }
        };
    }
    registerOnValidatorChange(fn) {
        this.onErrorStatusChange = fn;
    }
    initEditor() {
        const options = {
            value: [this.value].join('\n'),
            language: 'text',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            theme: 'vc'
        };
        if (this.insideNgZone) {
            this.editor = monaco.editor.create(this.editorContent.nativeElement, this.options ? Object.assign(Object.assign({}, options), this.options) : options);
        }
        else {
            this.zone.runOutsideAngular(() => {
                this.editor = monaco.editor.create(this.editorContent.nativeElement, this.options ? Object.assign(Object.assign({}, options), this.options) : options);
            });
        }
        this.registerEditorListeners();
        this.init.emit(this.editor);
    }
    registerEditorListeners() {
        this.editor.onDidChangeModelContent(() => {
            this.propagateChange(this.editor.getValue());
        });
        this.editor.onDidChangeModelDecorations(() => {
            const currentParsedError = this.modelMarkers.map(({ message }) => message).join('|');
            const hasValidationStatusChanged = this.parsedError !== currentParsedError;
            if (hasValidationStatusChanged) {
                this.parsedError = currentParsedError;
                this.onErrorStatusChange();
            }
        });
        this.editor.onDidBlurEditorText(() => {
            this.onTouched();
        });
    }
    ngOnDestroy() {
        if (this.editor) {
            this.editor.dispose();
        }
    }
}
MonacoEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoEditorComponent, deps: [{ token: MonacoEditorLoaderService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
MonacoEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.2", type: MonacoEditorComponent, selector: "ngx-monaco-editor", inputs: { options: "options", uri: "uri", insideNgZone: "insideNgZone" }, outputs: { init: "init" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MonacoEditorComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => MonacoEditorComponent),
            multi: true,
        }
    ], viewQueries: [{ propertyName: "editorContent", first: true, predicate: ["editor"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `
    <div #container class="editor-container" fxFlex>
      <div
        #editor
        class="monaco-editor"
      ></div>
    </div>`, isInline: true, styles: [".monaco-editor{position:absolute;top:0;bottom:0;left:0;right:0}.editor-container{overflow:hidden;position:relative;display:table;width:100%;height:100%;min-width:0}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-monaco-editor',
                    template: `
    <div #container class="editor-container" fxFlex>
      <div
        #editor
        class="monaco-editor"
      ></div>
    </div>`,
                    styles: [
                        `
      .monaco-editor {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

      }

      .editor-container {
        overflow: hidden;
        position: relative;
        display: table;
        width: 100%;
        height: 100%;
        min-width: 0;
      }`
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MonacoEditorComponent),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => MonacoEditorComponent),
                            multi: true,
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: MonacoEditorLoaderService }, { type: i0.NgZone }]; }, propDecorators: { options: [{
                type: Input
            }], uri: [{
                type: Input
            }], insideNgZone: [{
                type: Input
            }], init: [{
                type: Output
            }], editorContent: [{
                type: ViewChild,
                args: ['editor', { static: true }]
            }] } });

class MonacoDiffEditorComponent {
    constructor(monacoLoader) {
        this.monacoLoader = monacoLoader;
        this.init = new EventEmitter();
    }
    ngOnInit() {
        this.container = this.editorContent.nativeElement;
        this.monacoLoader.isMonacoLoaded$.pipe(filter(isLoaded => isLoaded), take(1)).subscribe(() => {
            this.initMonaco();
        });
    }
    ngOnChanges(changes) {
        if (this.editor && ((changes.code && !changes.code.firstChange) || (changes.modified && !changes.modified.firstChange))) {
            const modified = monaco.editor.createModel(this.modified);
            const original = monaco.editor.createModel(this.original);
            this.editor.setModel({
                original,
                modified
            });
        }
        if (this.editor &&
            changes.options &&
            !changes.options.firstChange) {
            if (changes.options.previousValue.theme !== changes.options.currentValue.theme) {
                monaco.editor.setTheme(changes.options.currentValue.theme);
            }
            this.editor.updateOptions(changes.options.currentValue);
        }
    }
    initMonaco() {
        let opts = {
            readOnly: true,
            automaticLayout: true,
            theme: 'vc'
        };
        if (this.options) {
            opts = Object.assign({}, opts, this.options);
        }
        this.editor = monaco.editor.createDiffEditor(this.container, opts);
        const original = monaco.editor.createModel(this.original);
        const modified = monaco.editor.createModel(this.modified);
        this.editor.setModel({
            original,
            modified
        });
        this.editor.layout();
        this.init.emit(this.editor);
    }
    ngOnDestroy() {
        if (this.editor) {
            this.editor.dispose();
        }
    }
}
MonacoDiffEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoDiffEditorComponent, deps: [{ token: MonacoEditorLoaderService }], target: i0.ɵɵFactoryTarget.Component });
MonacoDiffEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.2", type: MonacoDiffEditorComponent, selector: "ngx-monaco-diff-editor", inputs: { original: "original", modified: "modified", options: "options" }, outputs: { init: "init" }, viewQueries: [{ propertyName: "editorContent", first: true, predicate: ["diffEditor"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `<div #container class="editor-container" fxFlex>
		<div
			#diffEditor
			class="monaco-editor"
		></div>
</div>`, isInline: true, styles: [".monaco-editor{position:absolute;top:0;bottom:0;left:0;right:0}.editor-container{overflow:hidden;position:relative;display:table;width:100%;height:100%;min-width:0}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoDiffEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-monaco-diff-editor',
                    template: `<div #container class="editor-container" fxFlex>
		<div
			#diffEditor
			class="monaco-editor"
		></div>
</div>`,
                    styles: [
                        `
.monaco-editor {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

}
.editor-container {
	overflow: hidden;
	position: relative;
	display: table;
	width: 100%;
  height: 100%;
  min-width: 0;
}`
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: MonacoEditorLoaderService }]; }, propDecorators: { original: [{
                type: Input
            }], modified: [{
                type: Input
            }], options: [{
                type: Input
            }], init: [{
                type: Output
            }], editorContent: [{
                type: ViewChild,
                args: ['diffEditor', { static: true }]
            }] } });

class MonacoEditorModule {
}
MonacoEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MonacoEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoEditorModule, declarations: [MonacoEditorLoaderDirective,
        MonacoEditorComponent,
        MonacoDiffEditorComponent], exports: [MonacoEditorLoaderDirective,
        MonacoEditorComponent,
        MonacoDiffEditorComponent] });
MonacoEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoEditorModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    declarations: [
                        MonacoEditorLoaderDirective,
                        MonacoEditorComponent,
                        MonacoDiffEditorComponent
                    ],
                    exports: [
                        MonacoEditorLoaderDirective,
                        MonacoEditorComponent,
                        MonacoDiffEditorComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of materia-monaco-editor-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MONACO_PATH, MonacoDiffEditorComponent, MonacoEditorComponent, MonacoEditorLoaderDirective, MonacoEditorLoaderService, MonacoEditorModule };
