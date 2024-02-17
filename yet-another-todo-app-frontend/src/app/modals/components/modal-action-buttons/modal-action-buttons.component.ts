import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BackButton, CancelButton, NextButton, SubmitButton } from './modal-action-buttons.types';

const NOOP = async (): Promise<void> => {
  return;
};

@Component({
  selector: 'yata-modal-action-buttons',
  templateUrl: './modal-action-buttons.component.html',
  styleUrls: ['./modal-action-buttons.component.scss'],
})
export class ModalActionButtonsComponent {
  @Input() form?: FormGroup<any>;
  @Input() step: number = 1;
  @Input() total: number = 1;
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
  // TODO Remove cancel button
  @Input() cancelButton: CancelButton = {
    label: '',
    click: NOOP,
  };
}
