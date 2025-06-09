import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'yata-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
  standalone: true,
  imports: [MatIconModule]
})
export class SearchbarComponent {
  @Output() change = new EventEmitter<string>();

  isFocused = false;

  onChange(event: Event): void {
    this.change.next((event.target as HTMLInputElement).value || '');
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }
}
