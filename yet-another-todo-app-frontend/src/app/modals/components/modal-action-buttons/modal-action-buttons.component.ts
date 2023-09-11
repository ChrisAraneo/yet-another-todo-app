import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CancelButton, SubmitButton } from './modal-action-buttons.types';

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
  @Input() submitButton: SubmitButton = {
    label: '',
    color: 'primary',
    click: NOOP,
  };
  @Input() cancelButton: CancelButton = {
    label: '',
    click: NOOP,
  };
}
