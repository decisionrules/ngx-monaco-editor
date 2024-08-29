import { Injectable, Optional, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MONACO_PATH } from '../interfaces';
import * as i0 from "@angular/core";
export class MonacoEditorLoaderService {
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
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MONACO_PATH]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWVkaXRvci1sb2FkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9uZ3gtbW9uYWNvLWVkaXRvci9zcmMvbGliL3NlcnZpY2VzL21vbmFjby1lZGl0b3ItbG9hZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBVSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHNUMsTUFBTSxPQUFPLHlCQUF5QjtJQVdsQyxZQUFvQixNQUFjLEVBQTBDLGdCQUF3QjtRQUFoRixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQTBDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtRQVRwRyxvQkFBZSxHQUE2QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUN4RSxnQkFBVyxHQUFHLDZCQUE2QixDQUFDO1FBU2xELElBQVUsTUFBTyxDQUFDLDhCQUE4QixFQUFFO1lBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsRCxPQUFPO1NBQ1I7UUFFSyxNQUFPLENBQUMsOEJBQThCLEdBQUcsSUFBSSxDQUFDO1FBRXBELElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1NBQ3pDO1FBRUQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFuQkQsSUFBSSxVQUFVLENBQUMsS0FBYTtRQUN4QixJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxXQUFXLEdBQUcs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QUF5Qix3Q0FXc0IsV0FBVzswSEFYMUQseUJBQXlCLGNBRFosTUFBTTsyRkFDbkIseUJBQXlCO2tCQURyQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBWU8sUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lLCBPcHRpb25hbCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1PTkFDT19QQVRIIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTW9uYWNvRWRpdG9yTG9hZGVyU2VydmljZSB7XG4gICAgbm9kZVJlcXVpcmU6IGFueTtcbiAgICBpc01vbmFjb0xvYWRlZCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIHByaXZhdGUgX21vbmFjb1BhdGggPSAnYXNzZXRzL21vbmFjby1lZGl0b3IvbWluL3ZzJztcblxuICAgIHNldCBtb25hY29QYXRoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tb25hY29QYXRoID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lLCBAT3B0aW9uYWwoKSBASW5qZWN0KE1PTkFDT19QQVRIKSBwdWJsaWMgbW9uYWNvUGF0aENvbmZpZzogc3RyaW5nKSB7XG4gICAgICBpZiAoKDxhbnk+d2luZG93KS5tb25hY29FZGl0b3JBbHJlYWR5SW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgbmdab25lLnJ1bigoKSA9PiB0aGlzLmlzTW9uYWNvTG9hZGVkJC5uZXh0KHRydWUpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAoPGFueT53aW5kb3cpLm1vbmFjb0VkaXRvckFscmVhZHlJbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAgIGlmICh0aGlzLm1vbmFjb1BhdGhDb25maWcpIHtcbiAgICAgICAgdGhpcy5tb25hY29QYXRoID0gdGhpcy5tb25hY29QYXRoQ29uZmlnO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxvYWRNb25hY28oKTtcbiAgICB9XG5cbiAgICBsb2FkTW9uYWNvKCkge1xuICAgICAgY29uc3Qgb25Hb3RBbWRMb2FkZXIgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHZzUGF0aCA9IHRoaXMuX21vbmFjb1BhdGg7XG4gICAgICAgICg8YW55PndpbmRvdykuYW1kUmVxdWlyZSA9ICg8YW55PndpbmRvdykucmVxdWlyZTtcblxuICAgICAgICBjb25zdCBpc0VsZWN0cm9uID0gISF0aGlzLm5vZGVSZXF1aXJlO1xuICAgICAgICBjb25zdCBpc1BhdGhVcmwgPSB2c1BhdGguaW5jbHVkZXMoJ2h0dHAnKTtcblxuICAgICAgICBpZiAoaXNFbGVjdHJvbikge1xuICAgICAgICAgIC8vIFJlc3RvcmUgbm9kZSByZXF1aXJlIGluIHdpbmRvd1xuICAgICAgICAgICg8YW55PndpbmRvdykucmVxdWlyZSA9IHRoaXMubm9kZVJlcXVpcmU7XG5cbiAgICAgICAgICBpZiAoIWlzUGF0aFVybCkge1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9ICg8YW55PndpbmRvdykucmVxdWlyZSgncGF0aCcpO1xuICAgICAgICAgICAgdnNQYXRoID0gcGF0aC5yZXNvbHZlKCg8YW55PndpbmRvdykuX19kaXJuYW1lLCB0aGlzLl9tb25hY29QYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAoPGFueT53aW5kb3cpLmFtZFJlcXVpcmUuY29uZmlnKHsgcGF0aHM6IHsgdnM6IHZzUGF0aCB9IH0pO1xuXG4gICAgICAgIC8vIExvYWQgbW9uYWNvXG4gICAgICAgICg8YW55PndpbmRvdykuYW1kUmVxdWlyZShbJ3ZzL2VkaXRvci9lZGl0b3IubWFpbiddLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5pc01vbmFjb0xvYWRlZCQubmV4dCh0cnVlKSk7XG4gICAgICAgIH0sIChlcnJvcikgPT4gY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBtb25hY28tZWRpdG9yOiAnLCBlcnJvcikpO1xuICAgICAgfTtcblxuICAgICAgLy8gQ2hlY2sgaWYgQU1EIGxvYWRlciBhbHJlYWR5IGF2YWlsYWJsZVxuICAgICAgY29uc3QgaXNBbWRMb2FkZXJBdmFpbGFibGUgPSAhISg8YW55PndpbmRvdykuYW1kUmVxdWlyZTtcbiAgICAgIGlmIChpc0FtZExvYWRlckF2YWlsYWJsZSkge1xuICAgICAgICByZXR1cm4gb25Hb3RBbWRMb2FkZXIoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNFbGVjdHJvbiA9ICEhKDxhbnk+d2luZG93KS5yZXF1aXJlO1xuXG4gICAgICBpZiAoaXNFbGVjdHJvbikge1xuICAgICAgICB0aGlzLmFkZEVsZWN0cm9uRml4U2NyaXB0cygpO1xuICAgICAgICB0aGlzLm5vZGVSZXF1aXJlID0gKDxhbnk+d2luZG93KS5yZXF1aXJlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsb2FkZXJTY3JpcHQ6IEhUTUxTY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBsb2FkZXJTY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgbG9hZGVyU2NyaXB0LnNyYyA9IGAke3RoaXMuX21vbmFjb1BhdGh9L2xvYWRlci5qc2A7XG4gICAgICBsb2FkZXJTY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uR290QW1kTG9hZGVyKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobG9hZGVyU2NyaXB0KTtcbiAgICB9XG5cbiAgICBhZGRFbGVjdHJvbkZpeFNjcmlwdHMoKSB7XG4gICAgICAgIGNvbnN0IGVsZWN0cm9uRml4U2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIC8vIHdvcmthcm91bmQgbW9uYWNvLWNzcyBub3QgdW5kZXJzdGFuZGluZyB0aGUgZW52aXJvbm1lbnRcbiAgICAgICAgY29uc3QgaW5saW5lU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ3NlbGYubW9kdWxlID0gdW5kZWZpbmVkOycpO1xuICAgICAgICAvLyB3b3JrYXJvdW5kIG1vbmFjby10eXBlc2NyaXB0IG5vdCB1bmRlcnN0YW5kaW5nIHRoZSBlbnZpcm9ubWVudFxuICAgICAgICBjb25zdCBpbmxpbmVTY3JpcHQyID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ3NlbGYucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTsnKTtcbiAgICAgICAgZWxlY3Ryb25GaXhTY3JpcHQuYXBwZW5kQ2hpbGQoaW5saW5lU2NyaXB0KTtcbiAgICAgICAgZWxlY3Ryb25GaXhTY3JpcHQuYXBwZW5kQ2hpbGQoaW5saW5lU2NyaXB0Mik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlY3Ryb25GaXhTY3JpcHQpO1xuICAgIH1cbn1cbiJdfQ==