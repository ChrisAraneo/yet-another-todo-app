import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'yata-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  @Output() change = new EventEmitter<string>();

  isFocused: boolean = false;

  onChange(event: Event): void {
    this.change.next((<HTMLInputElement>event.target).value || '');
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }
}
