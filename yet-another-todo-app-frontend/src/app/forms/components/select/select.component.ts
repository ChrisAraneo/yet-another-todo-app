import { AfterViewInit, Component, forwardRef, Input } from '@angular/core';
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
export class SelectComponent implements ControlValueAccessor, AfterViewInit {
  @Input() label: string = '';
  @Input() options: Option<any>[] = [];

  selectedOption?: Option<any>;
  value?: any;

  changed?: (value: any) => void;
  touched?: () => void;

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.options[0]) {
        this.selectedOption = this.options[0];
        this.writeValue(this.options[0]);
      }
    });
  }

  onChange(event: Event): void {
    const value = this.options.find((item) => this.isEqual(item, event))?.value;

    this.changed && this.changed(value);
  }

  onBlur(): void {
    this.touched && this.touched();
  }

  writeValue(value: any): void {
    this.value = this.options.find((item) => this.isEqual(item, value))?.value;
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
