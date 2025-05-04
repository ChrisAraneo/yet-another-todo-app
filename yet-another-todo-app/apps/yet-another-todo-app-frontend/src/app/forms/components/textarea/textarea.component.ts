import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

import { ErrorTooltipDirective } from '../../directives/error-tooltip/error-tooltip.directive';
import { FormLabelComponent } from '../form-label/form-label.component';

@Component({
  selector: 'yata-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [FormLabelComponent, TextareaModule, ErrorTooltipDirective],
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() rows = 3;
  @Input() cols = 30;
  @Input() maxLength = 9999;

  value: string;
  isDisabled: boolean;

  changed?: (value: string) => void;
  touched?: () => void;

  constructor() {
    this.value = '';
    this.isDisabled = false;
  }

  onChange(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;

    this.changed && this.changed(value);
  }

  onBlur(): void {
    this.touched && this.touched();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(function_: any): void {
    this.changed = function_;
  }

  registerOnTouched(function_: any): void {
    this.touched = function_;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
