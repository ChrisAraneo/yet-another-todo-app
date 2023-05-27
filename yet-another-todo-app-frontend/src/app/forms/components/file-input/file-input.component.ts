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

  value: ArrayBuffer | null;
  isDisabled: boolean;

  changed?: (value: string) => void;
  touched?: () => void;

  constructor() {
    this.value = null;
    this.isDisabled = false;
  }

  onChange(event: Event): void {
    const inputElement: HTMLInputElement = <HTMLInputElement>event.target;

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (event: any): void => {
        this.changed && this.changed(event.target.result);
      };

      reader.readAsArrayBuffer((inputElement?.files as FileList)[0]);
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
