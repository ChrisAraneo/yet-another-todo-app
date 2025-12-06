import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NOOP } from '../../../shared/utils/noop.const';

@Component({
  selector: 'yata-back-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
})
export class BackButtonComponent {
  @Input() back: (event?: any) => Promise<void> = NOOP;
  @Input() icon?: string = 'navigate_before';

  isLoading = false;

  onButtonClick(event?: any): void {
    this.isLoading = true;

    this.back(event).then(() => (this.isLoading = false));
  }
}
