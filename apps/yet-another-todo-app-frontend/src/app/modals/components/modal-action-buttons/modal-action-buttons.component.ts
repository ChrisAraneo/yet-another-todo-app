import { Component, Input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { NOOP } from '../../../shared/utils/noop.const';
import {
  BackButton,
  NextButton,
  SubmitButton,
} from './modal-action-buttons.types';
import {
  ButtonComponent,
  VariantDirective,
} from '@chris.araneo/yet-another-todo-app-common-components';

@Component({
  selector: 'yata-modal-action-buttons',
  standalone: true,
  imports: [
    ButtonComponent,
    TranslatePipe,
    VariantDirective,
  ],
  templateUrl: './modal-action-buttons.component.html',
  styleUrl: './modal-action-buttons.component.scss',
})
export class ModalActionButtonsComponent {
  @Input() form?: FormGroup;
  @Input() step = 1;
  @Input() total = 1;
  @Input() nextButton: NextButton = {
    label: '',
    color: '',
    click: NOOP,
  };
  @Input() backButton: BackButton = {
    label: '',
    color: '',
    click: NOOP,
  };
  @Input() submitButton: SubmitButton = {
    label: '',
    color: 'primary',
    click: NOOP,
  };

  protected backButtonLoading = signal(false);
  protected nextButtonLoading = signal(false);
  protected submitButtonLoading = signal(false);

  onBackButtonClick(): void {
    if (this.backButton.click) {
      this.backButtonLoading.set(true);
      this.backButton.click().then(() => this.backButtonLoading.set(false));
    }
  }

  onNextButtonClick(): void {
    if (this.nextButton.click) {
      this.nextButtonLoading.set(true);
      this.nextButton.click().then(() => this.nextButtonLoading.set(false));
    }
  }

  onSubmitButtonClick(): void {
    if (this.submitButton.click) {
      this.submitButtonLoading.set(true);
      this.submitButton.click().then(() => this.submitButtonLoading.set(false));
    }
  }
}
