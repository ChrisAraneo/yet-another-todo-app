import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
})
export class FileInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() selectFileLabel: string = '';
  @Input() changeFileLabel: string = '';

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

    const inputElement: HTMLInputElement = <HTMLInputElement>event.target;

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
