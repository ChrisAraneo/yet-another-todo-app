import {
  AfterViewInit,
  ComponentRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorTooltipComponent } from './components/error-tooltip/error-tooltip.component';

@Directive({
  selector: '[yataErrorTooltip]',
})
export class ErrorTooltipDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input('yataErrorTooltip') label?: string = '';

  private component?: ComponentRef<any>;
  private subscription?: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private ngControl: NgControl,
  ) {}

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
    this.component = this.viewContainerRef.createComponent(ErrorTooltipComponent);
  }

  ngAfterViewInit(): void {
    this.subscribeToValueChanges();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  private subscribeToValueChanges(): void {
    this.subscription = (this.ngControl as any).valueChanges.subscribe(() =>
      this.updateComponentInputs(this.ngControl.errors, this.label),
    );
  }

  private updateComponentInputs(errors: ValidationErrors | null, label?: string): void {
    if (this.component) {
      this.component.setInput('errors', errors);
      this.component.setInput('label', label || '');
    }
  }
}
