import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// TODO Move to separate file
type Time = {
  hours: number;
  minutes: number;
};

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
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() range: boolean = false;
  @Input() showTime: boolean = false;

  model?: Date | (Date | null)[];

  start: Time = {
    hours: 0,
    minutes: 0,
  };
  end: Time = {
    hours: 0,
    minutes: 0,
  };

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

      if (dates[0]) {
        dates[0]?.setHours(this.start?.hours);
        dates[0]?.setMinutes(this.start?.minutes);
      }

      if (dates[1]) {
        dates[1]?.setHours(this.end?.hours);
        dates[1]?.setMinutes(this.end?.minutes);
      }

      this.value = dates.map((item) => item?.toISOString()).filter((item) => !!item) as string[];
    } else {
      (event as Date | null)?.setHours(this.start?.hours);
      (event as Date | null)?.setMinutes(this.start?.minutes);

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
    this.updateTime(this.model);
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

  private updateTime(model: Date | (Date | null)[] | undefined): void {
    if (!model) {
      return;
    } else if (model instanceof Date) {
      this.start.hours = model.getHours();
      this.start.minutes = model.getMinutes();
    } else if (this.isDateOrNullArray(model)) {
      this.start.hours = model[0]?.getHours() || 0;
      this.start.minutes = model[0]?.getMinutes() || 0;

      if (model.length === 1) {
        this.end.hours = model[0]?.getHours() || 0;
        this.end.minutes = model[0]?.getMinutes() || 0;
      } else {
        this.end.hours = model[1]?.getHours() || 0;
        this.end.minutes = model[1]?.getMinutes() || 0;
      }
    }
  }

  private isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && !value.find((item) => !(typeof item === 'string'));
  }

  private isDateOrNullArray(value: unknown): value is (Date | null)[] {
    return Array.isArray(value) && !value.find((item) => !(item instanceof Date || item === null));
  }
}
