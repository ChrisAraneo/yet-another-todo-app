import { Component, Input } from '@angular/core';
import { NOOP } from '../../../shared/utils/noop.const';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'yata-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
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
