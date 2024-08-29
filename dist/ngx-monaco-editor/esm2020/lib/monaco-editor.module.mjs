import { NgModule } from '@angular/core';
import { MonacoEditorLoaderDirective } from './directives/monaco-editor-loader.directive';
import { MonacoEditorComponent } from './components/monaco-editor/monaco-editor.component';
import { MonacoDiffEditorComponent } from './components/monaco-diff-editor/monaco-diff-editor.component';
import * as i0 from "@angular/core";
export class MonacoEditorModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWVkaXRvci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbmd4LW1vbmFjby1lZGl0b3Ivc3JjL2xpYi9tb25hY28tZWRpdG9yLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDhEQUE4RCxDQUFDOztBQWV6RyxNQUFNLE9BQU8sa0JBQWtCOzsrR0FBbEIsa0JBQWtCO2dIQUFsQixrQkFBa0IsaUJBVnZCLDJCQUEyQjtRQUMzQixxQkFBcUI7UUFDckIseUJBQXlCLGFBR3pCLDJCQUEyQjtRQUMzQixxQkFBcUI7UUFDckIseUJBQXlCO2dIQUdwQixrQkFBa0IsWUFabEIsRUFBRTsyRkFZRixrQkFBa0I7a0JBYjlCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLEVBQUU7b0JBQ1gsWUFBWSxFQUFFO3dCQUNWLDJCQUEyQjt3QkFDM0IscUJBQXFCO3dCQUNyQix5QkFBeUI7cUJBQzVCO29CQUNELE9BQU8sRUFBRTt3QkFDTCwyQkFBMkI7d0JBQzNCLHFCQUFxQjt3QkFDckIseUJBQXlCO3FCQUM1QjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb25hY29FZGl0b3JMb2FkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbW9uYWNvLWVkaXRvci1sb2FkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1vbmFjb0VkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tb25hY28tZWRpdG9yL21vbmFjby1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IE1vbmFjb0RpZmZFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9uYWNvLWRpZmYtZWRpdG9yL21vbmFjby1kaWZmLWVkaXRvci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNb25hY29FZGl0b3JMb2FkZXJEaXJlY3RpdmUsXG4gICAgICAgIE1vbmFjb0VkaXRvckNvbXBvbmVudCxcbiAgICAgICAgTW9uYWNvRGlmZkVkaXRvckNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNb25hY29FZGl0b3JMb2FkZXJEaXJlY3RpdmUsXG4gICAgICAgIE1vbmFjb0VkaXRvckNvbXBvbmVudCxcbiAgICAgICAgTW9uYWNvRGlmZkVkaXRvckNvbXBvbmVudFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTW9uYWNvRWRpdG9yTW9kdWxlIHsgfVxuIl19