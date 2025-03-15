import { Component, Input } from '@angular/core';
import { NOOP } from 'src/app/shared/utils/noop.const';

@Component({
    selector: 'yata-back-button',
    templateUrl: './back-button.component.html',
    styleUrls: ['./back-button.component.scss'],
    standalone: false
})
export class BackButtonComponent {
  @Input() back: (event?: any) => Promise<void> = NOOP;
  @Input() icon?: string = 'navigate_before';

  isLoading: boolean = false;

  onButtonClick(event?: any): void {
    this.isLoading = true;

    this.back(event).then(() => (this.isLoading = false));
  }
}
