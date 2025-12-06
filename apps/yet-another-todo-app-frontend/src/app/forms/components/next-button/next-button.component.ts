import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { NOOP } from '../../../shared/utils/noop.const';

@Component({
  selector: 'yata-next-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './next-button.component.html',
  styleUrl: './next-button.component.scss',
})
export class NextButtonComponent {
  @Input() next: (event?: any) => Promise<void> = NOOP;
  @Input() icon?: string = 'navigate_next';

  isLoading = false;

  onButtonClick(event?: any): void {
    this.isLoading = true;

    this.next(event).then(() => (this.isLoading = false));
  }
}
