import { Component, Input } from '@angular/core';

const NOOP = async (): Promise<void> => {
  return;
};

@Component({
  selector: 'yata-next-button',
  templateUrl: './next-button.component.html',
  styleUrls: ['./next-button.component.scss'],
})
export class NextButtonComponent {
  @Input() next: (event?: any) => Promise<void> = NOOP;
  @Input() color?: string = '';
  @Input() icon?: string = 'navigate_next';

  isLoading: boolean = false;

  onButtonClick(event?: any): void {
    this.isLoading = true;

    this.next(event).then(() => (this.isLoading = false));
  }
}
