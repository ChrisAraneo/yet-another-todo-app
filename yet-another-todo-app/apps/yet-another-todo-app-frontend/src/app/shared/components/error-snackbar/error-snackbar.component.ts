import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'yata-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss'],
  imports: [TitleComponent],
  standalone: true,
})
export class ErrorSnackbarComponent {
  message = '';

  private readonly maxLength = 600;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: object) {
    this.updateMessage(data);
  }

  private updateMessage(data: object): void {
    const json = JSON.stringify(data);

    this.message =
      json.length > this.maxLength
        ? json.slice(0, Math.max(0, this.maxLength - 3)) + ' ...'
        : json;
  }
}
