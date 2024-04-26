import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yata-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
})
export class TimePickerComponent implements ControlValueAccessor {
  @Input() label: string = '';

  hours: string;
  minutes: string;
  isDisabled: boolean;

  changed?: (value: string) => void;
  touched?: () => void;

  constructor() {
    this.hours = '00';
    this.minutes = '00';
    this.isDisabled = false;
  }

  onHoursChange(event: any): void {
    let value = '';

    if (event instanceof InputEvent || event instanceof Event) {
      value = (event.target as HTMLInputElement)?.value || '';
    } else {
      return;
    }

    const hours: string = '00' + value.replace(/\D/g, '');

    // TODO Fix hours > 23
    this.hours = hours.charAt(hours.length - 2) + hours.charAt(hours.length - 1);
    (event.target as HTMLInputElement).value = this.hours;

    this.changed && this.changed(this.hours + ':' + this.minutes);
  }

  onMinutesChange(event: any): void {
    let value = '';

    if (event instanceof InputEvent || event instanceof Event) {
      value = (event.target as HTMLInputElement)?.value || '';
    } else {
      return;
    }

    const minutes: string = '00' + value.replace(/\D/g, '');

    // TODO Fix minutes > 59
    this.minutes = minutes.charAt(minutes.length - 2) + minutes.charAt(minutes.length - 1);
    (event.target as HTMLInputElement).value = this.minutes;

    this.changed && this.changed(this.hours + ':' + this.minutes);
  }

  onBlur(): void {
    this.touched && this.touched();
  }

  writeValue(value: string): void {
    const parts = value.split(':');

    this.onHoursChange(parts[0]);
    this.onMinutesChange(parts[1] || '');
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
