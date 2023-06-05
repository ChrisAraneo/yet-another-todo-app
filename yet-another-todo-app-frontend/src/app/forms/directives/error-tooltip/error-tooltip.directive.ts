import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[yataErrorTooltip]',
})
export class ErrorTooltipDirective implements OnInit {
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}
