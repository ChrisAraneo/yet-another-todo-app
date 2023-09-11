import { Component, Input } from '@angular/core';

const NOOP = async (): Promise<void> => {
  return;
};

@Component({
  selector: 'yata-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.scss'],
})
export class CancelButtonComponent {
  @Input() disabled: boolean = false;
  @Input() cancel: (() => Promise<void>) | (() => void) = NOOP;

  onButtonClick(): void {
    this.cancel();
  }
}
