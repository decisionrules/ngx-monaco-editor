import { TemplateRef, ViewContainerRef, OnDestroy, OnInit } from '@angular/core';
import { MonacoEditorLoaderService } from '../services/monaco-editor-loader.service';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MonacoEditorLoaderDirective implements OnInit, OnDestroy {
    private templateRef;
    private viewContainer;
    private monacoEditorLoaderService;
    isMonacoLoaded$: import("rxjs").Observable<boolean>;
    destroyed$: Subject<void>;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, monacoEditorLoaderService: MonacoEditorLoaderService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MonacoEditorLoaderDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MonacoEditorLoaderDirective, "[ngxLoadMonacoEditor]", never, {}, {}, never>;
}
