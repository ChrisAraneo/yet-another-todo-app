import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { ErrorTooltipDirective } from '../../directives/error-tooltip/error-tooltip.directive';
import { FormLabelComponent } from '../form-label/form-label.component';

@Component({
  selector: 'yata-password-input',
  standalone: true,
  imports: [
    ErrorTooltipDirective,
    FormLabelComponent,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent implements ControlValueAccessor, OnInit {
  @Input() label = '';
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

  onChange(event: any): void {
    const value: string = event as string;

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

  registerOnChange(function_: any): void {
    this.changed = function_;
  }

  registerOnTouched(function_: any): void {
    this.touched = function_;
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
