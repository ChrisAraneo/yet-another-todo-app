import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NOOP } from '../../../shared/utils/noop.const';

@Component({
  selector: 'yata-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    NgTemplateOutlet,
    MatIconModule,
    NgIf,
    MatProgressSpinnerModule,
  ],
})
export class SubmitButtonComponent {
  @Input() invalid = false;
  @Input() pending = false;
  @Input() submit: (event?: any) => Promise<void> = NOOP;
  @Input() color = 'primary';
  @Input() icon?: string;

  readonly spinnerDiameter = 24;

  isLoading = false;

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
