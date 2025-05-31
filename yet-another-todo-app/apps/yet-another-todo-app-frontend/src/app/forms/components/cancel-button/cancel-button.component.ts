import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { NOOP } from '../../../shared/utils/noop.const';

@Component({
  selector: 'yata-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrl: './cancel-button.component.scss',
  standalone: true,
  imports: [MatButtonModule],
})
export class CancelButtonComponent {
  @Input() disabled = false;
  @Input() cancel: (() => Promise<void>) | (() => void) = NOOP;

  onButtonClick(): void {
    this.cancel();
  }
}
