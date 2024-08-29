import { Directive } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../services/monaco-editor-loader.service";
export class MonacoEditorLoaderDirective {
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
MonacoEditorLoaderDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoEditorLoaderDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: i1.MonacoEditorLoaderService }], target: i0.ɵɵFactoryTarget.Directive });
MonacoEditorLoaderDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.2", type: MonacoEditorLoaderDirective, selector: "[ngxLoadMonacoEditor]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MonacoEditorLoaderDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ngxLoadMonacoEditor]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i1.MonacoEditorLoaderService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWVkaXRvci1sb2FkZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25neC1tb25hY28tZWRpdG9yL3NyYy9saWIvZGlyZWN0aXZlcy9tb25hY28tZWRpdG9yLWxvYWRlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0QsTUFBTSxlQUFlLENBQUM7QUFFNUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUcvQixNQUFNLE9BQU8sMkJBQTJCO0lBSXRDLFlBQ1UsV0FBNkIsRUFDN0IsYUFBK0IsRUFDL0IseUJBQW9EO1FBRnBELGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0IsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQU45RCxvQkFBZSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDaEYsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFNOUIsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDekUsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDbkM7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdCLENBQUM7O3dIQXRCVSwyQkFBMkI7NEdBQTNCLDJCQUEyQjsyRkFBM0IsMkJBQTJCO2tCQUR2QyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vbmFjb0VkaXRvckxvYWRlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9tb25hY28tZWRpdG9yLWxvYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25neExvYWRNb25hY29FZGl0b3JdJyB9KVxuZXhwb3J0IGNsYXNzIE1vbmFjb0VkaXRvckxvYWRlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgaXNNb25hY29Mb2FkZWQkID0gdGhpcy5tb25hY29FZGl0b3JMb2FkZXJTZXJ2aWNlLmlzTW9uYWNvTG9hZGVkJC5hc09ic2VydmFibGUoKTtcbiAgZGVzdHJveWVkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBtb25hY29FZGl0b3JMb2FkZXJTZXJ2aWNlOiBNb25hY29FZGl0b3JMb2FkZXJTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmlzTW9uYWNvTG9hZGVkJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpKS5zdWJzY3JpYmUoKGxvYWRlZCkgPT4ge1xuICAgICAgaWYgKCFsb2FkZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgICAgfVxuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveWVkJC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95ZWQkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==