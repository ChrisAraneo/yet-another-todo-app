import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  BackButton,
  NextButton,
  SubmitButton,
} from './modal-action-buttons.types';
import { NOOP } from '../../../shared/utils/noop.const';
import { BackButtonComponent } from '../../../forms/components/back-button/back-button.component';
import { NextButtonComponent } from '../../../forms/components/next-button/next-button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { SubmitButtonComponent } from '../../../forms/components/submit-button/submit-button.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'yata-modal-action-buttons',
  templateUrl: './modal-action-buttons.component.html',
  styleUrls: ['./modal-action-buttons.component.scss'],
  standalone: true,
  imports: [
    BackButtonComponent,
    NextButtonComponent,
    TranslatePipe,
    SubmitButtonComponent,
    NgIf,
  ],
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
}
