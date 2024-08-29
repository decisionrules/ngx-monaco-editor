import { NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MonacoEditorLoaderService {
    private ngZone;
    monacoPathConfig: string;
    nodeRequire: any;
    isMonacoLoaded$: BehaviorSubject<boolean>;
    private _monacoPath;
    set monacoPath(value: string);
    constructor(ngZone: NgZone, monacoPathConfig: string);
    loadMonaco(): void;
    addElectronFixScripts(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MonacoEditorLoaderService, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MonacoEditorLoaderService>;
}
