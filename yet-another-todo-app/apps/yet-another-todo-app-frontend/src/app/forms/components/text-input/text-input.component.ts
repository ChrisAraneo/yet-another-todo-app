import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { ErrorTooltipDirective } from '../../directives/error-tooltip/error-tooltip.directive';
import { FormLabelComponent } from '../form-label/form-label.component';

@Component({
  selector: 'yata-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    FormLabelComponent,
    FormsModule,
    InputTextModule,
    ErrorTooltipDirective,
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = '';

  value: string;
  isDisabled: boolean;

  changed?: (value: string) => void;
  touched?: () => void;

  constructor() {
    this.value = '';
    this.isDisabled = false;
  }

  onChange(event: any): void {
    const value: string = event as string;

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
