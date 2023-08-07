import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
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
  @ViewChild('select') selectElementRef!: ElementRef;

  @Input() label: string = '';
  @Input() options: Option<any>[] = [];

  value?: any;
  selectedIndex: number;
  isDisabled: boolean;

  changed?: (value: any) => void;
  touched?: () => void;

  constructor() {
    this.selectedIndex = 0;
    this.isDisabled = false;
  }

  ngAfterViewInit(): void {
    const index: number = this.options
      .map((option) => option.value)
      .findIndex((value) => {
        if (typeof value === 'object') {
          return !diff(value, this.value || {}).length;
        } else {
          return value === this.value;
        }
      });
    const nonNegativeIndex = index >= 0 ? index : 0;

    setTimeout(() => {
      this.selectedIndex = nonNegativeIndex;
      this.selectElementRef.nativeElement.value = nonNegativeIndex;
    });
  }

  onChange(event: Event): void {
    const selectedIndex: number = +(<HTMLInputElement>event.target).value;
    const selectedOption = this.options[selectedIndex];
    const selectedValue = selectedOption.value;

    this.value = selectedValue;
    this.selectedIndex = selectedIndex;

    this.changed && this.changed(selectedValue);
  }

  onBlur(): void {
    this.touched && this.touched();
  }

  writeValue(value: any): void {
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
