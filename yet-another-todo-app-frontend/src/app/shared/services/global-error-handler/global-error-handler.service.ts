import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from '../../components/error-snackbar/error-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  private readonly durationInSeconds = 5;

  constructor(private snackBar: MatSnackBar) {}

  handleError(error: any): void {
    console.error(error?.message);

    this.openErrorSnackBar(error);
  }

  private openErrorSnackBar(error: any): void {
    this.snackBar.openFromComponent(ErrorSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: error?.message,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
}
