import { Component, Input } from '@angular/core';

const NOOP = async (): Promise<void> => {
  return;
};

@Component({
  selector: 'yata-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
  @Input() back: (event?: any) => Promise<void> = NOOP;
  @Input() color?: string = '';
  @Input() icon?: string = 'navigate_before';

  isLoading: boolean = false;

  onButtonClick(event?: any): void {
    this.isLoading = true;

    this.back(event).then(() => (this.isLoading = false));
  }
}
