import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'yata-error-snackbar',
    templateUrl: './error-snackbar.component.html',
    styleUrls: ['./error-snackbar.component.scss'],
    standalone: false
})
export class ErrorSnackbarComponent {
  message: string = '';

  private readonly maxLength = 600;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.updateMessage(data);
  }

  private updateMessage(data: any): void {
    const json = JSON.stringify(data);

    if (json.length > this.maxLength) {
      this.message = json.substring(0, this.maxLength - 3) + ' ...';
    } else {
      this.message = json;
    }
  }
}
