import { Component, Input } from '@angular/core';
import { NOOP } from 'src/app/shared/utils/noop.const';

@Component({
    selector: 'yata-next-button',
    templateUrl: './next-button.component.html',
    styleUrls: ['./next-button.component.scss'],
    standalone: false
})
export class NextButtonComponent {
  @Input() next: (event?: any) => Promise<void> = NOOP;
  @Input() icon?: string = 'navigate_next';

  isLoading: boolean = false;

  onButtonClick(event?: any): void {
    this.isLoading = true;

    this.next(event).then(() => (this.isLoading = false));
  }
}
