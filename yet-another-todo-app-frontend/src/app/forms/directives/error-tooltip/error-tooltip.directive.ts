import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[yataErrorTooltip]',
})
export class ErrorTooltipDirective implements OnInit {
  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }
}
