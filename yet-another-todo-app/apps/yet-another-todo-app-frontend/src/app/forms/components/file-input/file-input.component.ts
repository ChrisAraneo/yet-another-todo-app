import { NgIf } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

import { LabelComponent } from '../../../shared/components/label/label.component';
import { FormLabelComponent } from '../form-label/form-label.component';

@Component({
  selector: 'yata-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    MatIconModule,
    FormLabelComponent,
    LabelComponent,
    TranslatePipe,
    NgIf,
  ],
})
export class FileInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() selectFileLabel = '';
  @Input() changeFileLabel = '';

  value: ArrayBuffer | null;
  filename: string;
  isDisabled: boolean;
  isLoading: boolean;

  changed?: (value: string) => void;
  touched?: () => void;

  constructor() {
    this.value = null;
    this.filename = '';
    this.isDisabled = false;
    this.isLoading = false;
  }

  onChange(event: Event): void {
    if (this.isLoading || this.isDisabled) {
      return;
    }

    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    if (typeof FileReader !== 'undefined') {
      this.filename = '';
      this.isLoading = true;

      const reader = new FileReader();
      const file = (inputElement?.files as FileList)[0];

      reader.onload = (event: any): void => {
        this.isLoading = false;
        this.filename = file.name;

        this.changed && this.changed(event.target.result);
      };

      reader.readAsArrayBuffer(file);
    }
  }

  onBlur(): void {
    this.touched && this.touched();
  }

  writeValue(value: ArrayBuffer | null): void {
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
