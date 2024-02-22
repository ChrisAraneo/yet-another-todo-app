import { Component, Input } from '@angular/core';
import { NOOP } from 'src/app/shared/utils/noop.const';

@Component({
  selector: 'yata-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent {
  @Input() invalid: boolean = false;
  @Input() pending: boolean = false;
  @Input() submit: (event?: any) => Promise<void> = NOOP;
  @Input() color: string = 'primary';
  @Input() icon?: string;

  readonly spinnerDiameter = 24;

  isLoading: boolean = false;

  onButtonClick(event?: any): void {
    this.isLoading = true;

    this.submit(event)
      .then(() => {
        this.isLoading = false;
      })
      .catch((error: any) => {
        this.isLoading = false;
        console.error(error);
      });
  }
}
