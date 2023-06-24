import { Component, Input } from '@angular/core';

const NOOP = async (): Promise<void> => {
  return;
};

@Component({
  selector: 'yata-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent {
  @Input() invalid: boolean = false;
  @Input() pending: boolean = false;
  @Input() submit: () => Promise<void> = NOOP;

  isLoading: boolean = false;

  onButtonClick(): void {
    this.isLoading = true;

    this.submit()
      .then(() => {
        this.isLoading = false;
      })
      .catch((error: any) => {
        this.isLoading = false;
        console.error(error);
      });
  }
}
