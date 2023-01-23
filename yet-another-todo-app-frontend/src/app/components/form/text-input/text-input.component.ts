import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
})
export class TextInputComponent implements ControlValueAccessor {
  value: string;
  isDisabled: boolean;

  changed?: (value: string) => void;
  touched?: () => void;

  constructor() {
    this.value = '';
    this.isDisabled = false;
  }

  onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;

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
