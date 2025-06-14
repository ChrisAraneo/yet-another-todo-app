import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'yata-searchbar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent {
  @Output()
  change = new EventEmitter<string>();

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
