import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges): void {
    const errors = changes['errors'].currentValue as object | null;

    if (errors === null) {
      this.list = [];
    } else {
      const keys = Object.keys(errors);

      this.list = keys.map((key) => {
        const value = (errors as any)[key];

        return {
          key,
          value: { ...value, label: this.label },
        };
      });
    }
  }
}
