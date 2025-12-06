import { NgFor, NgIf, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { cloneDeep } from '../../../shared/utils/clone-deep.function';
import { diff } from '../../../shared/utils/diff.function';
import { FormLabelComponent } from '../form-label/form-label.component';
import { DisplayedOption, Option } from './select.types';

// TODO Fix dropdown icon animation
// TODO Implement inline display option

@Component({
  selector: 'yata-select',
  standalone: true,
  imports: [
    FormLabelComponent,
    FormsModule,
    InputTextModule,
    NgFor,
    NgIf,
    NgStyle,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent
  implements ControlValueAccessor, AfterViewInit, OnInit, OnChanges
{
  @ViewChild('input')
  inputElementRef!: ElementRef;

  @Input() label = '';
  @Input() options: Option<any>[] = [];
  @Input() inline = false;

  text: string;
  value: any;
  dropdown = {
    width: '0',
    isOpened: false,
  };
  displayedOptions: DisplayedOption<any>[] = [];
  isDisabled: boolean;
  selectedIndex: number;

  changed?: (value: any) => void;
  touched?: () => void;

  private isClickedOutsideDropdown = false;

  constructor() {
    this.text = '';
    this.value = null;
    this.isDisabled = false;
    this.selectedIndex = -1;
  }

  ngOnInit(): void {
    if (this.inline) {
      this.openDropdown();
    } else {
      this.closeDropdownWhenNotInline();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.updateDisplayedOptions(this.options, this.text);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.text =
        this.displayedOptions?.find(
          (item) => diff(item.value, this.value)?.length === 0,
        )?.label || '';
      this.dropdown.width = `${this.inputElementRef.nativeElement?.offsetWidth || 0}px`;
    });
  }

  selectOption(event: Event, selectedIndex: number): void {
    event.preventDefault();

    const selectedOption = this.displayedOptions[+selectedIndex];

    this.value = selectedOption?.value || null;
    this.text = selectedOption?.label || '';
    this.closeDropdownWhenNotInline();
    this.selectedIndex = selectedIndex;

    this.changed && this.changed(selectedOption.value);
  }

  onChange(event: Event): void {
    const selectedIndex = +(event.target as HTMLInputElement).value;
    const selectedOption = this.displayedOptions[selectedIndex];

    this.value = selectedOption?.value || null;
    this.selectedIndex = selectedIndex;
    this.changed && this.changed(selectedOption.value);
  }

  onChangeText(event: string): void {
    const selectedValue =
      this.selectedIndex > -1
        ? cloneDeep(this.displayedOptions[this.selectedIndex]).value
        : null;

    if (event.length === 0) {
      this.updateDisplayedOptions(this.options, event);
      this.selectedIndex =
        this.displayedOptions?.findIndex(
          (item) => diff(item.value, selectedValue)?.length === 0,
        ) || -1;

      return;
    }

    const found: Option<any>[] = [];
    const notFound: Option<any>[] = [];

    for (const option of this.displayedOptions) {
      if (option.label.toLocaleLowerCase().includes(event)) {
        found.push(option);
      } else {
        notFound.push(option);
      }
    }

    this.updateDisplayedOptions([...found, ...notFound], event);
    this.selectedIndex = this.displayedOptions.findIndex(
      (item) => diff(item.value, selectedValue)?.length === 0,
    );
  }

  onFocus(): void {
    this.openDropdown();
  }

  onBlur(event: Event): void {
    event.preventDefault();

    this.isClickedOutsideDropdown = true;

    setTimeout(() => {
      if (this.isClickedOutsideDropdown) {
        this.closeDropdownWhenNotInline();
      }
      this.isClickedOutsideDropdown = false;
    }, 150);

    this.touched && this.touched();
  }

  onClick(): void {
    setTimeout(() => {
      this.isClickedOutsideDropdown = false;
    });
  }

  writeValue(value: any): void {
    this.value = value;

    if (this.displayedOptions?.length > 0) {
      this.selectedIndex = this.displayedOptions.findIndex(
        (item) => diff(item.value, value)?.length === 0,
      );
      this.text =
        this.selectedIndex >= 0
          ? this.displayedOptions[this.selectedIndex].label
          : '';
    } else {
      this.selectedIndex = -1;
      this.text = '';
    }
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

  private updateDisplayedOptions(
    options: Option<any>[],
    searchText: string,
  ): void {
    this.displayedOptions = cloneDeep<Option<any>[]>(options).map(
      (option: Option<any>) => {
        const indexOf = option.label
          .toLocaleLowerCase()
          .indexOf(searchText.toLocaleLowerCase());
        const highlightStart = searchText.length > 0 ? indexOf : -1;
        const highlightEnd =
          highlightStart > -1 ? highlightStart + searchText.length - 1 : -1;

        return {
          ...option,
          symbols: option.label.split(''),
          highlight: {
            start: highlightStart,
            end: highlightEnd,
          },
        };
      },
    );
  }

  private openDropdown(): void {
    this.dropdown.isOpened = true;
  }

  private closeDropdownWhenNotInline(): void {
    !this.inline && this.closeDropdown();
  }

  private closeDropdown(): void {
    this.dropdown.isOpened = false;
  }
}
