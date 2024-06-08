import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Option } from './select.types';

// TODO Fix hover cursor
// TODO Fix dropdown icon animation
// TODO Implement searching items

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
  @ViewChild('input') inputElementRef!: ElementRef;

  @Input() label: string = '';
  @Input() options: Option<any>[] = [];

  text: string;
  value: any;
  dropdown = {
    width: '0',
    isOpened: false,
  };
  isDisabled: boolean;
  selectedIndex: number;

  dropdownStyles: { [key: string]: string | number };

  changed?: (value: any) => void;
  touched?: () => void;

  constructor() {
    this.text = '';
    this.value = null;
    this.dropdown.width = '0';
    this.dropdown.isOpened = false;
    this.isDisabled = false;
    this.dropdownStyles = {};
    this.selectedIndex = -1;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.text = this.options.find((item) => item.value === this.value)?.label || '';
      this.dropdown.width = `${this.inputElementRef.nativeElement?.offsetWidth || 0}px`;
    });
  }

  selectOption(event: Event, selectedIndex: number): void {
    event.preventDefault();

    const selectedOption = this.options[+selectedIndex];

    this.value = selectedOption.value;
    this.text = selectedOption.label;
    this.dropdown.isOpened = false;
    this.selectedIndex = selectedIndex;
    this.changed && this.changed(selectedOption.value);
  }

  onChange(event: Event): void {
    const selectedIndex = +(<HTMLInputElement>event.target).value;
    const selectedOption = this.options[selectedIndex];

    this.value = selectedOption.value;
    this.selectedIndex = selectedIndex;
    this.changed && this.changed(selectedOption.value);
  }

  onFocus(): void {
    this.dropdown.isOpened = true;
  }

  onBlur(): void {
    this.touched && this.touched();
  }

  writeValue(value: any): void {
    this.value = value;
    this.selectedIndex = this.options.findIndex((item) => item.value === value);
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
