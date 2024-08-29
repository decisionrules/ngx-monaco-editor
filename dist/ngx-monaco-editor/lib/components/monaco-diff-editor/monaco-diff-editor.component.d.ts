import { ElementRef, EventEmitter, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MonacoEditorLoaderService } from '../../services/monaco-editor-loader.service';
import { MonacoDiffEditorConstructionOptions, MonacoStandaloneDiffEditor } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class MonacoDiffEditorComponent implements OnInit, OnChanges, OnDestroy {
    private monacoLoader;
    container: HTMLDivElement;
    editor: MonacoStandaloneDiffEditor;
    original: string;
    modified: string;
    options: MonacoDiffEditorConstructionOptions;
    init: EventEmitter<MonacoStandaloneDiffEditor>;
    editorContent: ElementRef;
    constructor(monacoLoader: MonacoEditorLoaderService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private initMonaco;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MonacoDiffEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MonacoDiffEditorComponent, "ngx-monaco-diff-editor", never, { "original": "original"; "modified": "modified"; "options": "options"; }, { "init": "init"; }, never, never>;
}
