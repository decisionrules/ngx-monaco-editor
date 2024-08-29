import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { filter, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../services/monaco-editor-loader.service";
export class MonacoEditorComponent {
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
            const { language: toLanguage, theme: toTheme, ...options } = changes.options.currentValue;
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
            this.editor = monaco.editor.create(this.editorContent.nativeElement, this.options ? { ...options, ...this.options } : options);
        }
        else {
            this.zone.runOutsideAngular(() => {
                this.editor = monaco.editor.create(this.editorContent.nativeElement, this.options ? { ...options, ...this.options } : options);
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
MonacoEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoEditorComponent, deps: [{ token: i1.MonacoEditorLoaderService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: i1.MonacoEditorLoaderService }, { type: i0.NgZone }]; }, propDecorators: { options: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbmd4LW1vbmFjby1lZGl0b3Ivc3JjL2xpYi9jb21wb25lbnRzL21vbmFjby1lZGl0b3IvbW9uYWNvLWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBS0wsTUFBTSxFQUVOLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGFBQWEsRUFBRSxpQkFBaUIsRUFBK0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUNySCxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFnRDlDLE1BQU0sT0FBTyxxQkFBcUI7SUE2QmhDLFlBQW9CLFlBQXVDLEVBQ3ZDLElBQVk7UUFEWixpQkFBWSxHQUFaLFlBQVksQ0FBMkI7UUFDdkMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQTNCdkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDcEIsU0FBSSxHQUE2QyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBUXRFLGNBQVMsR0FBZSxHQUFHLEVBQUU7UUFDckMsQ0FBQyxDQUFDO1FBQ00sd0JBQW1CLEdBQWUsR0FBRyxFQUFFO1FBQy9DLENBQUMsQ0FBQztRQUNNLG9CQUFlLEdBQW9CLEdBQUcsRUFBRTtRQUNoRCxDQUFDLENBQUM7SUFjRixDQUFDO0lBWkQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUNqRCxR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eUJBQ1o7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLGFBQWE7NEJBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLHNCQUFzQixDQUFDOzRCQUNwRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRjtxSUFFVSxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0ksSUFBSTtzQkFBYixNQUFNO2dCQUM4QixhQUFhO3NCQUFqRCxTQUFTO3VCQUFDLFFBQVEsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTElEQVRPUlMsIE5HX1ZBTFVFX0FDQ0VTU09SLCBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1vbmFjb0VkaXRvckxvYWRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9tb25hY28tZWRpdG9yLWxvYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE1vbmFjb0VkaXRvckNvbnN0cnVjdGlvbk9wdGlvbnMsIE1vbmFjb0VkaXRvclVyaSwgTW9uYWNvU3RhbmRhbG9uZUNvZGVFZGl0b3IgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LW1vbmFjby1lZGl0b3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgI2NvbnRhaW5lciBjbGFzcz1cImVkaXRvci1jb250YWluZXJcIiBmeEZsZXg+XG4gICAgICA8ZGl2XG4gICAgICAgICNlZGl0b3JcbiAgICAgICAgY2xhc3M9XCJtb25hY28tZWRpdG9yXCJcbiAgICAgID48L2Rpdj5cbiAgICA8L2Rpdj5gLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAubW9uYWNvLWVkaXRvciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuXG4gICAgICB9XG5cbiAgICAgIC5lZGl0b3ItY29udGFpbmVyIHtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgfWBcbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTW9uYWNvRWRpdG9yQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTW9uYWNvRWRpdG9yQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNb25hY29FZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcbiAgQElucHV0KCkgb3B0aW9uczogTW9uYWNvRWRpdG9yQ29uc3RydWN0aW9uT3B0aW9ucztcbiAgQElucHV0KCkgdXJpPzogTW9uYWNvRWRpdG9yVXJpO1xuICBASW5wdXQoKSBpbnNpZGVOZ1pvbmUgPSBmYWxzZTtcbiAgQE91dHB1dCgpIGluaXQ6IEV2ZW50RW1pdHRlcjxNb25hY29TdGFuZGFsb25lQ29kZUVkaXRvcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBWaWV3Q2hpbGQoJ2VkaXRvcicsIHtzdGF0aWM6IHRydWV9KSBlZGl0b3JDb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIGVkaXRvcjogTW9uYWNvU3RhbmRhbG9uZUNvZGVFZGl0b3I7XG4gIG1vZGVsVXJpSW5zdGFuY2U6IG1vbmFjby5lZGl0b3IuSVRleHRNb2RlbDtcbiAgdmFsdWU6IHN0cmluZztcbiAgcGFyc2VkRXJyb3I6IHN0cmluZztcblxuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHtcbiAgfTtcbiAgcHJpdmF0ZSBvbkVycm9yU3RhdHVzQ2hhbmdlOiAoKSA9PiB2b2lkID0gKCkgPT4ge1xuICB9O1xuICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZTogKF86IGFueSkgPT4gYW55ID0gKCkgPT4ge1xuICB9O1xuXG4gIGdldCBtb2RlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuZ2V0TW9kZWwoKTtcbiAgfVxuXG4gIGdldCBtb2RlbE1hcmtlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWwgJiYgbW9uYWNvLmVkaXRvci5nZXRNb2RlbE1hcmtlcnMoe1xuICAgICAgcmVzb3VyY2U6IHRoaXMubW9kZWwudXJpXG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vbmFjb0xvYWRlcjogTW9uYWNvRWRpdG9yTG9hZGVyU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubW9uYWNvTG9hZGVyLmlzTW9uYWNvTG9hZGVkJC5waXBlKFxuICAgICAgZmlsdGVyKGlzTG9hZGVkID0+IGlzTG9hZGVkKSxcbiAgICAgIHRha2UoMSlcbiAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXRFZGl0b3IoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5lZGl0b3IgJiYgY2hhbmdlcy5vcHRpb25zICYmICFjaGFuZ2VzLm9wdGlvbnMuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIGNvbnN0IHtsYW5ndWFnZTogdG9MYW5ndWFnZSwgdGhlbWU6IHRvVGhlbWUsIC4uLm9wdGlvbnN9ID0gY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZTtcbiAgICAgIGNvbnN0IHtsYW5ndWFnZTogZnJvbUxhbmd1YWdlLCB0aGVtZTogZnJvbVRoZW1lfSA9IGNoYW5nZXMub3B0aW9ucy5wcmV2aW91c1ZhbHVlO1xuXG4gICAgICBpZiAoZnJvbUxhbmd1YWdlICE9PSB0b0xhbmd1YWdlKSB7XG4gICAgICAgIG1vbmFjby5lZGl0b3Iuc2V0TW9kZWxMYW5ndWFnZShcbiAgICAgICAgICB0aGlzLmVkaXRvci5nZXRNb2RlbCgpLFxuICAgICAgICAgIHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubGFuZ3VhZ2UgPyB0aGlzLm9wdGlvbnMubGFuZ3VhZ2UgOiAndGV4dCdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZyb21UaGVtZSAhPT0gdG9UaGVtZSkge1xuICAgICAgICBtb25hY28uZWRpdG9yLnNldFRoZW1lKHRvVGhlbWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVkaXRvci51cGRhdGVPcHRpb25zKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVkaXRvciAmJiBjaGFuZ2VzLnVyaSkge1xuICAgICAgY29uc3QgdG9VcmkgPSBjaGFuZ2VzLnVyaS5jdXJyZW50VmFsdWU7XG4gICAgICBjb25zdCBmcm9tVXJpID0gY2hhbmdlcy51cmkucHJldmlvdXNWYWx1ZTtcblxuICAgICAgaWYgKGZyb21VcmkgJiYgIXRvVXJpIHx8ICFmcm9tVXJpICYmIHRvVXJpIHx8IHRvVXJpICYmIGZyb21VcmkgJiYgdG9VcmkucGF0aCAhPT0gZnJvbVVyaS5wYXRoKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5lZGl0b3IuZ2V0VmFsdWUoKTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbFVyaUluc3RhbmNlKSB7XG4gICAgICAgICAgdGhpcy5tb2RlbFVyaUluc3RhbmNlLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBleGlzdGluZ01vZGVsO1xuXG4gICAgICAgIGlmICh0b1VyaSkge1xuICAgICAgICAgIGV4aXN0aW5nTW9kZWwgPSBtb25hY28uZWRpdG9yLmdldE1vZGVscygpLmZpbmQoKG1vZGVsKSA9PiBtb2RlbC51cmkucGF0aCA9PT0gdG9VcmkucGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vZGVsVXJpSW5zdGFuY2UgPSBleGlzdGluZ01vZGVsID8gZXhpc3RpbmdNb2RlbCA6IG1vbmFjby5lZGl0b3IuY3JlYXRlTW9kZWwodmFsdWUsIHRoaXMub3B0aW9ucy5sYW5ndWFnZSB8fCAndGV4dCcsIHRoaXMudXJpKTtcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0TW9kZWwodGhpcy5tb2RlbFVyaUluc3RhbmNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuZWRpdG9yICYmIHZhbHVlKSB7XG4gICAgICB0aGlzLmVkaXRvci5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgdGhpcy5lZGl0b3Iuc2V0VmFsdWUoJycpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHZhbGlkYXRlKCk6IFZhbGlkYXRpb25FcnJvcnMge1xuICAgIHJldHVybiAhdGhpcy5wYXJzZWRFcnJvciA/IG51bGwgOiB7XG4gICAgICBtb25hY286IHtcbiAgICAgICAgdmFsdWU6IHRoaXMucGFyc2VkRXJyb3Iuc3BsaXQoJ3wnKSxcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZT8oZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uRXJyb3JTdGF0dXNDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEVkaXRvcigpIHtcbiAgICBjb25zdCBvcHRpb25zOiBNb25hY29FZGl0b3JDb25zdHJ1Y3Rpb25PcHRpb25zID0ge1xuICAgICAgdmFsdWU6IFt0aGlzLnZhbHVlXS5qb2luKCdcXG4nKSxcbiAgICAgIGxhbmd1YWdlOiAndGV4dCcsXG4gICAgICBhdXRvbWF0aWNMYXlvdXQ6IHRydWUsXG4gICAgICBzY3JvbGxCZXlvbmRMYXN0TGluZTogZmFsc2UsXG4gICAgICB0aGVtZTogJ3ZjJ1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5pbnNpZGVOZ1pvbmUpIHtcbiAgICAgIHRoaXMuZWRpdG9yID0gbW9uYWNvLmVkaXRvci5jcmVhdGUoXG4gICAgICAgIHRoaXMuZWRpdG9yQ29udGVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICB0aGlzLm9wdGlvbnMgPyB7Li4ub3B0aW9ucywgLi4udGhpcy5vcHRpb25zfSA6IG9wdGlvbnNcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gbW9uYWNvLmVkaXRvci5jcmVhdGUoXG4gICAgICAgICAgdGhpcy5lZGl0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgdGhpcy5vcHRpb25zID8gey4uLm9wdGlvbnMsIC4uLnRoaXMub3B0aW9uc30gOiBvcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMucmVnaXN0ZXJFZGl0b3JMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmluaXQuZW1pdCh0aGlzLmVkaXRvcik7XG4gIH1cblxuICByZWdpc3RlckVkaXRvckxpc3RlbmVycygpIHtcbiAgICB0aGlzLmVkaXRvci5vbkRpZENoYW5nZU1vZGVsQ29udGVudCgoKSA9PiB7XG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmVkaXRvci5nZXRWYWx1ZSgpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZWRpdG9yLm9uRGlkQ2hhbmdlTW9kZWxEZWNvcmF0aW9ucygoKSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50UGFyc2VkRXJyb3IgPSB0aGlzLm1vZGVsTWFya2Vycy5tYXAoKHttZXNzYWdlfSkgPT4gbWVzc2FnZSkuam9pbignfCcpO1xuICAgICAgY29uc3QgaGFzVmFsaWRhdGlvblN0YXR1c0NoYW5nZWQgPSB0aGlzLnBhcnNlZEVycm9yICE9PSBjdXJyZW50UGFyc2VkRXJyb3I7XG5cbiAgICAgIGlmIChoYXNWYWxpZGF0aW9uU3RhdHVzQ2hhbmdlZCkge1xuICAgICAgICB0aGlzLnBhcnNlZEVycm9yID0gY3VycmVudFBhcnNlZEVycm9yO1xuICAgICAgICB0aGlzLm9uRXJyb3JTdGF0dXNDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZWRpdG9yLm9uRGlkQmx1ckVkaXRvclRleHQoKCkgPT4ge1xuICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgdGhpcy5lZGl0b3IuZGlzcG9zZSgpO1xuICAgIH1cbiAgfVxufVxuIl19