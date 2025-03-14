import { Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ErrorTooltipItem } from './error-tooltip.types';

@Component({
  selector: 'yata-error-tooltip',
  templateUrl: './error-tooltip.component.html',
  styleUrls: ['./error-tooltip.component.scss'],
})
export class ErrorTooltipComponent implements OnChanges {
  @Input() errors: ValidationErrors | null = null;
  @Input() label: string = '';

  list: ErrorTooltipItem[] = [];

  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const errors = changes['errors'].currentValue as object | null;

    this.list = this.mapErrorsToErrorTooltipItems(errors);

    if (errors === null) {
      this.removeErrorClasses();
    } else {
      this.addErrorClasses();
    }
  }

  private mapErrorsToErrorTooltipItems(errors: object | null): ErrorTooltipItem[] {
    if (errors === null) {
      return [];
    }

    const keys: string[] = Object.keys(errors);

    return keys.map((key) => {
      const value = (errors as any)[key];

      return {
        key,
        value: { ...value, label: this.label },
      };
    });
  }

  private removeErrorClasses(): void {
    const controlElement = this.hostElement.nativeElement?.previousSibling || null;

    if (controlElement) {
      this.renderer.removeClass(controlElement, 'ng-invalid');
      this.renderer.addClass(controlElement, 'ng-valid');
      this.renderer.addClass(controlElement, 'ng-dirty');
    }
  }

  private addErrorClasses(): void {
    const controlElement = this.hostElement.nativeElement?.previousSibling || null;

    if (controlElement) {
      this.renderer.removeClass(controlElement, 'ng-valid');
      this.renderer.addClass(controlElement, 'ng-invalid');
      this.renderer.addClass(controlElement, 'ng-dirty');
    }
  }
}
