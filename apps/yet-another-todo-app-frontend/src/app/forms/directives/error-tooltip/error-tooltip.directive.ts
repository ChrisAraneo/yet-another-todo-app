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
  standalone: true,
})
export class ErrorTooltipDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input('yataErrorTooltip')
  label?: string = '';

  private component?: ComponentRef<any>;
  private subscription?: Subscription;

  constructor(
    private readonly templateReference: TemplateRef<any>,
    private readonly viewContainerReference: ViewContainerRef,
    private readonly ngControl: NgControl,
  ) {}

  ngOnInit(): void {
    this.viewContainerReference.createEmbeddedView(this.templateReference);
    this.component = this.viewContainerReference.createComponent(
      ErrorTooltipComponent,
    );
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

  private updateComponentInputs(
    errors: ValidationErrors | null,
    label?: string,
  ): void {
    if (this.component) {
      this.component.setInput('errors', errors);
      this.component.setInput('label', label || '');
    }
  }
}
