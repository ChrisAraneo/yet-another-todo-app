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
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    InputTextModule,
    FormLabelComponent,
    FormsModule,
    ErrorTooltipDirective,
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
