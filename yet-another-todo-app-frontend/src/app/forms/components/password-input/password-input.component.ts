import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'yata-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() formControlName?: string;
  @Input() parentForm?: FormGroup;

  value: string;
  isDisabled: boolean;
  errors: ValidationErrors | null;

  changed?: (value: string) => void;
  touched?: () => void;

  private control?: AbstractControl;

  constructor() {
    this.value = '';
    this.isDisabled = false;
    this.errors = null;
  }

  ngOnInit(): void {
    if (this.parentForm && this.formControlName) {
      const control = this.parentForm.get(this.formControlName);

      if (control) {
        this.control = control;
      }
    }
  }

  onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;

    this.changed && this.changed(value);

    this.updateErrors();
  }

  onBlur(): void {
    this.touched && this.touched();
    this.updateErrors();
  }

  writeValue(value: string): void {
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

  private updateErrors(): void {
    if (!this.control || (this.control && this.control.untouched)) {
      return;
    }

    this.errors = this.control.errors;
  }
}
