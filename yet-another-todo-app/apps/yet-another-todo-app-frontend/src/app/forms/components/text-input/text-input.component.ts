import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FormLabelComponent } from '../form-label/form-label.component';
import { InputTextModule } from 'primeng/inputtext';
import { ErrorTooltipDirective } from '../../directives/error-tooltip/error-tooltip.directive';

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
  @Input() label: string = '';

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

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
