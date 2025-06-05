import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { ErrorTooltipDirective } from '../../directives/error-tooltip/error-tooltip.directive';
import { FormLabelComponent } from '../form-label/form-label.component';

@Component({
  selector: 'yata-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [FormLabelComponent, InputTextModule, ErrorTooltipDirective],
})
export class TimePickerComponent
  implements ControlValueAccessor, AfterViewInit
{
  @Input() label = '';

  @ViewChild('hours') hoursInput!: ElementRef;
  @ViewChild('minutes') minutesInput!: ElementRef;

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

  ngAfterViewInit(): void {
    this.hoursInput && (this.hoursInput.nativeElement.value = this.hours);
    this.minutesInput && (this.minutesInput.nativeElement.value = this.minutes);
  }

  onHoursChange(event: InputEvent | Event | string): void {
    let value = '';

    if (event instanceof InputEvent || event instanceof Event) {
      value = (event.target as HTMLInputElement)?.value || '';
    } else if (typeof event === 'string') {
      value = event;
    }

    let hours = `00${value.replaceAll(/\D/g, '')}`;

    if (+hours > 23) {
      hours = '23';
    } else if (+hours < 0) {
      hours = '00';
    }

    this.hours =
      hours.charAt(hours.length - 2) + hours.charAt(hours.length - 1);

    if (event instanceof Event) {
      (event.target as HTMLInputElement).value = this.hours;
    }

    this.changed && this.changed(`${this.hours}:${this.minutes}`);
  }

  onMinutesChange(event: InputEvent | Event | string): void {
    let value = '';

    if (event instanceof InputEvent || event instanceof Event) {
      value = (event.target as HTMLInputElement)?.value || '';
    } else if (typeof event === 'string') {
      value = event;
    }

    let minutes = `00${value.replaceAll(/\D/g, '')}`;

    if (+minutes > 59) {
      minutes = '59';
    } else if (+minutes < 0) {
      minutes = '00';
    }

    this.minutes =
      minutes.charAt(minutes.length - 2) + minutes.charAt(minutes.length - 1);

    if (event instanceof Event) {
      (event.target as HTMLInputElement).value = this.minutes;
    }

    this.changed && this.changed(`${this.hours}:${this.minutes}`);
  }

  onBlur(): void {
    this.touched && this.touched();
  }

  writeValue(value: string): void {
    const parts = value.split(':');

    this.onHoursChange(parts[0]);
    this.onMinutesChange(parts[1] || '');
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
