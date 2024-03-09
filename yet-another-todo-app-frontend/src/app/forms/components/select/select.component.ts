import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import diff from 'microdiff';
import { Option } from './select.types';

@Component({
  selector: 'yata-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() options: Option<any>[] = [];

  selectedOption?: Option<any>;
  value?: any;

  changed?: (value: any) => void;
  touched?: () => void;

  onChange(event: Event): void {
    const value = this.options.find((item) => this.isEqual(item, event))?.value;

    this.changed && this.changed(value);
  }

  onBlur(): void {
    this.touched && this.touched();
  }

  writeValue(value: any): void {
    this.options.forEach((item, index) => {
      if (this.isEqual(item?.value, value)) {
        this.value = item?.value;
        this.selectedOption = this.options[index];
      }
    });
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  private isEqual(a: any, b: any): boolean {
    if (typeof a === 'object' && typeof b === 'object') {
      return !diff(a, b).length;
    } else {
      return a === b;
    }
  }
}
