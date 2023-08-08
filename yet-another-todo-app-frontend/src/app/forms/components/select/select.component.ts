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
      .findIndex((value) => this.isEqual(value, this.value || {}));
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
    const selectedIndex: number = this.options
      .map((option) => option.value)
      .findIndex((item) => this.isEqual(item, value));

    if (selectedIndex >= 0) {
      const selectedOption = this.options[selectedIndex];
      this.value = selectedOption.value;

      const nonNegativeIndex = selectedIndex >= 0 ? selectedIndex : 0;
      this.selectedIndex = nonNegativeIndex;
    } else {
      console.error('Selected value not found in available options', value);
    }
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

  private isEqual(a: any, b: any): boolean {
    if (typeof a === 'object' && typeof b === 'object') {
      return !diff(a, b).length;
    } else {
      return a === b;
    }
  }
}
