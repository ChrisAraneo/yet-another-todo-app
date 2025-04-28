import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { NOOP } from '../../../shared/utils/noop.const';

@Component({
  selector: 'yata-next-button',
  templateUrl: './next-button.component.html',
  styleUrls: ['./next-button.component.scss'],
  standalone: true,
  imports: [MatIconModule],
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
