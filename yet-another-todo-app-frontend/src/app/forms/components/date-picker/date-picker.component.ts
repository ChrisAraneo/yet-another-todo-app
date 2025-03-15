import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'yata-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true,
        },
    ],
    standalone: false
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() range: boolean = false;

  model?: Date | (Date | null)[];

  value: string | string[] | null;
  isDisabled: boolean;

  changed?: (value: string | string[] | null) => void;
  touched?: () => void;

  constructor() {
    this.value = null;
    this.isDisabled = false;
  }

  onChangeDate(event: Date | (Date | null)[] | unknown): void {
    if (this.range && this.isDateOrNullArray(event)) {
      const dates = event.filter((item: Date | null) => item !== null);

      this.value = dates.map((item) => item?.toISOString()).filter((item) => !!item) as string[];
    } else {
      this.value = event instanceof Date ? event.toISOString() : null;
    }

    this.changed && this.changed(this.value);
  }

  onBlur(): void {
    this.touched && this.touched();
  }

  writeValue(value: string | string[] | null): void {
    this.value = value;

    this.updateModel(value);
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

  private updateModel(value: string | string[] | null): void {
    if (value === null) {
      this.model = undefined;
    } else if (typeof value === 'string') {
      this.model = new Date(value);
    } else if (this.isStringArray(value)) {
      this.model = value.map((item) => new Date(item));
    }
  }

  private isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && !value.find((item) => !(typeof item === 'string'));
  }

  private isDateOrNullArray(value: unknown): value is (Date | null)[] {
    return Array.isArray(value) && !value.find((item) => !(item instanceof Date || item === null));
  }
}
