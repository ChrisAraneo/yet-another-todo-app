import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  @Input() submit: () => Promise<void> = NOOP;
  @Input() cancel: (() => Promise<void>) | (() => void) = NOOP;
  @Input() cancelLabel: string = '';
  @Input() submitLabel: string = '';
}
