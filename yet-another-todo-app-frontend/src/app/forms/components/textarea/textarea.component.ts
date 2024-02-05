import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() rows: number = 3;
  @Input() cols: number = 30;
  @Input() maxLength: number = 9999;

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
