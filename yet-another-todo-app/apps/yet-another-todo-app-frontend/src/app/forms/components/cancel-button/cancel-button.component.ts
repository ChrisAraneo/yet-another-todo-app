import { Component, Input } from '@angular/core';
import { NOOP } from '../../../shared/utils/noop.const';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'yata-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class CancelButtonComponent {
  @Input() disabled: boolean = false;
  @Input() cancel: (() => Promise<void>) | (() => void) = NOOP;

  onButtonClick(): void {
    this.cancel();
  }
}
