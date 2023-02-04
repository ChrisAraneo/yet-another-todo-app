import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import diff from 'microdiff';

type Option = {
  label: string;
  value: any;
};

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
  @Input() options: Option[] = [];

  value: any;
  isDisabled: boolean;

  changed?: (value: any) => void;
  touched?: () => void;

  constructor() {
    this.isDisabled = false;
  }

  ngAfterViewInit(): void {
    const index: number = this.options
      .map((option) => option.value)
      .findIndex((value) => !diff(value, this.value).length);

    this.selectElementRef.nativeElement.value = index >= 0 ? index : 0;
  }

  onChange(event: Event): void {
    const selectedIndex: string = (<HTMLInputElement>event.target).value;
    const selectedOption = this.options[+selectedIndex];

    this.value = selectedOption.value;
    this.changed && this.changed(selectedOption.value);
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
