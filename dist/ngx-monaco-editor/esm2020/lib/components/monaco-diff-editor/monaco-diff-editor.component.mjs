import { Component, ViewChild, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../services/monaco-editor-loader.service";
export class MonacoDiffEditorComponent {
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
MonacoDiffEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoDiffEditorComponent, deps: [{ token: i1.MonacoEditorLoaderService }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: i1.MonacoEditorLoaderService }]; }, propDecorators: { original: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWRpZmYtZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9uZ3gtbW9uYWNvLWVkaXRvci9zcmMvbGliL2NvbXBvbmVudHMvbW9uYWNvLWRpZmYtZWRpdG9yL21vbmFjby1kaWZmLWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxTQUFTLEVBRVQsWUFBWSxFQUlaLE1BQU0sRUFDTixLQUFLLEVBQ0wsdUJBQXVCLEVBRTFCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQWtDOUMsTUFBTSxPQUFPLHlCQUF5QjtJQVdsQyxZQUFvQixZQUF1QztRQUF2QyxpQkFBWSxHQUFaLFlBQVksQ0FBMkI7UUFKakQsU0FBSSxHQUE4QyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBSWhCLENBQUM7SUFFaEUsUUFBUTtRQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUNsQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFDNUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNWLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNiLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUU7WUFDckgsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFDakIsUUFBUTtnQkFDUixRQUFRO2FBQ1gsQ0FBQyxDQUFDO1NBQ047UUFDRCxJQUNJLElBQUksQ0FBQyxNQUFNO1lBQ1gsT0FBTyxDQUFDLE9BQU87WUFDZixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUM5QjtZQUNFLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtnQkFDNUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUQ7WUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzNEO0lBQ0wsQ0FBQztJQUVPLFVBQVU7UUFDZCxJQUFJLElBQUksR0FBd0M7WUFDNUMsUUFBUSxFQUFFLElBQUk7WUFDZCxlQUFlLEVBQUUsSUFBSTtZQUNyQixLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoRDtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRW5FLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDakIsUUFBUTtZQUNSLFFBQVE7U0FDWCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDOztzSEF2RVEseUJBQXlCOzBHQUF6Qix5QkFBeUIscVRBM0J4Qjs7Ozs7T0FLUDsyRkFzQk0seUJBQXlCO2tCQTdCckMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxRQUFRLEVBQUU7Ozs7O09BS1A7b0JBQ0gsTUFBTSxFQUFFO3dCQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0VBZ0JOO3FCQUNHO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNsRDtnSEFLWSxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNJLElBQUk7c0JBQWIsTUFBTTtnQkFFa0MsYUFBYTtzQkFBckQsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgVmlld0NoaWxkLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIE9uSW5pdCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBJbnB1dCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNb25hY29FZGl0b3JMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbW9uYWNvLWVkaXRvci1sb2FkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBNb25hY29EaWZmRWRpdG9yQ29uc3RydWN0aW9uT3B0aW9ucywgTW9uYWNvU3RhbmRhbG9uZURpZmZFZGl0b3IgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtbW9uYWNvLWRpZmYtZWRpdG9yJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgI2NvbnRhaW5lciBjbGFzcz1cImVkaXRvci1jb250YWluZXJcIiBmeEZsZXg+XG5cdFx0PGRpdlxuXHRcdFx0I2RpZmZFZGl0b3Jcblx0XHRcdGNsYXNzPVwibW9uYWNvLWVkaXRvclwiXG5cdFx0PjwvZGl2PlxuPC9kaXY+YCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYFxuLm1vbmFjby1lZGl0b3Ige1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcblxufVxuLmVkaXRvci1jb250YWluZXIge1xuXHRvdmVyZmxvdzogaGlkZGVuO1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdGRpc3BsYXk6IHRhYmxlO1xuXHR3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtaW4td2lkdGg6IDA7XG59YFxuICAgIF0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTW9uYWNvRGlmZkVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XG4gICAgZWRpdG9yOiBNb25hY29TdGFuZGFsb25lRGlmZkVkaXRvcjtcblxuICAgIEBJbnB1dCgpIG9yaWdpbmFsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbW9kaWZpZWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBvcHRpb25zOiBNb25hY29EaWZmRWRpdG9yQ29uc3RydWN0aW9uT3B0aW9ucztcbiAgICBAT3V0cHV0KCkgaW5pdDogRXZlbnRFbWl0dGVyPCBNb25hY29TdGFuZGFsb25lRGlmZkVkaXRvcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdkaWZmRWRpdG9yJywge3N0YXRpYzogdHJ1ZX0pIGVkaXRvckNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vbmFjb0xvYWRlcjogTW9uYWNvRWRpdG9yTG9hZGVyU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmVkaXRvckNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5tb25hY29Mb2FkZXIuaXNNb25hY29Mb2FkZWQkLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoaXNMb2FkZWQgPT4gaXNMb2FkZWQpLFxuICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbml0TW9uYWNvKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yICYmICgoY2hhbmdlcy5jb2RlICYmICFjaGFuZ2VzLmNvZGUuZmlyc3RDaGFuZ2UpIHx8IChjaGFuZ2VzLm1vZGlmaWVkICYmICFjaGFuZ2VzLm1vZGlmaWVkLmZpcnN0Q2hhbmdlKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vZGlmaWVkID0gbW9uYWNvLmVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLm1vZGlmaWVkKTtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsID0gbW9uYWNvLmVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLm9yaWdpbmFsKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNldE1vZGVsKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbCxcbiAgICAgICAgICAgICAgICBtb2RpZmllZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5lZGl0b3IgJiZcbiAgICAgICAgICAgIGNoYW5nZXMub3B0aW9ucyAmJlxuICAgICAgICAgICAgIWNoYW5nZXMub3B0aW9ucy5maXJzdENoYW5nZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLm9wdGlvbnMucHJldmlvdXNWYWx1ZS50aGVtZSAhPT0gY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZS50aGVtZSkge1xuICAgICAgICAgICAgICAgIG1vbmFjby5lZGl0b3Iuc2V0VGhlbWUoY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZS50aGVtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnVwZGF0ZU9wdGlvbnMoY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRNb25hY28oKSB7XG4gICAgICAgIGxldCBvcHRzOiBNb25hY29EaWZmRWRpdG9yQ29uc3RydWN0aW9uT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgICAgICAgYXV0b21hdGljTGF5b3V0OiB0cnVlLFxuICAgICAgICAgICAgdGhlbWU6ICd2YydcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZURpZmZFZGl0b3IodGhpcy5jb250YWluZXIsIG9wdHMpO1xuXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsID0gbW9uYWNvLmVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLm9yaWdpbmFsKTtcbiAgICAgICAgY29uc3QgbW9kaWZpZWQgPSBtb25hY28uZWRpdG9yLmNyZWF0ZU1vZGVsKHRoaXMubW9kaWZpZWQpO1xuXG4gICAgICAgIHRoaXMuZWRpdG9yLnNldE1vZGVsKHtcbiAgICAgICAgICAgIG9yaWdpbmFsLFxuICAgICAgICAgICAgbW9kaWZpZWRcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZWRpdG9yLmxheW91dCgpO1xuICAgICAgICB0aGlzLmluaXQuZW1pdCh0aGlzLmVkaXRvcik7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19