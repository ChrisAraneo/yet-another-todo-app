import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';

import { TaskState } from '../../../../../../yet-another-todo-app-shared';
import { DatePickerComponent } from '../../../forms/components/date-picker/date-picker.component';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { DateUtilsService as DateUtilitiesService } from '../../../shared/services/date-utils/date-utils.service';
import { ViewConfigurationService } from '../../../shared/services/view-configuration/view-configuration.service';
import { ModalActionButtonsComponent } from '../modal-action-buttons/modal-action-buttons.component';
import {
  ConfigureTimelineForm,
  ConfigureTimelineModalData,
} from './configure-timeline-modal.types';
import { DragDropTaskOrderListComponent } from './drag-drop-task-order-list/drag-drop-task-order-list.component';

@Component({
  selector: 'yata-configure-timeline-modal',
  templateUrl: './configure-timeline-modal.component.html',
  styleUrl: './configure-timeline-modal.component.scss',
  standalone: true,
  imports: [
    NgIf,
    TranslatePipe,
    FormsModule,
    ReactiveFormsModule,
    TitleComponent,
    DatePickerComponent,
    DragDropTaskOrderListComponent,
    ModalActionButtonsComponent,
  ],
})
export class ConfigureTimelineModalComponent {
  static readonly PANEL_CLASS = 'configure-timeline-modal';

  readonly orderedStates: TaskState[];
  readonly filteredStates: TaskState[];

  form?: FormGroup<ConfigureTimelineForm>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfigureTimelineModalData,
    public dialogReference: MatDialogRef<ConfigureTimelineModalComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly dateUtilitiesService: DateUtilitiesService,
    private readonly viewConfigurationService: ViewConfigurationService,
  ) {
    const { startDate, endDate, statesOrder, statesFilter } = this.data;

    this.orderedStates = statesOrder;
    this.filteredStates = statesFilter;

    this.initializeForm(startDate, endDate, statesOrder, statesFilter);
  }

  submit: () => Promise<void> = async () => {
    if (this.form === undefined || this.form?.invalid) {
      return;
    }

    const startDate = new Date(this.form.value.startDate!);
    const endDate = new Date(this.form.value.endDate!);
    const statesOrder = this.form.value.statesOrder!;
    const statesFilter = this.form.value.statesFilter!;

    this.viewConfigurationService.changeTimelineStartDate(startDate);
    this.viewConfigurationService.changeTimelineEndDate(endDate);
    this.viewConfigurationService.changeTimelineColumnSorting(statesOrder);
    this.viewConfigurationService.changeTimelineFiltering(statesFilter);

    this.dialogReference.close();
  };

  cancel: () => void = () => {
    this.dialogReference.close();
  };

  changeStatesOrder(event: TaskState[]): void {
    this.form?.controls.statesOrder.patchValue(event);
  }

  changeStatesFilter(event: TaskState[]): void {
    this.form?.controls.statesFilter.patchValue(event);
  }

  private initializeForm(
    startDate: Date,
    endDate: Date,
    statesOrder: TaskState[],
    statesFilter: TaskState[],
  ): void {
    this.form = this.formBuilder.group<ConfigureTimelineForm>({
      startDate: new FormControl(
        this.dateUtilitiesService.formatDate(startDate, 'yyyy-MM-dd'),
        {
          validators: [Validators.required],
          nonNullable: true,
        },
      ),
      endDate: new FormControl(
        this.dateUtilitiesService.formatDate(endDate, 'yyyy-MM-dd'),
        {
          validators: [Validators.required],
          nonNullable: true,
        },
      ),
      statesOrder: new FormControl(statesOrder, {
        validators: Validators.required,
        nonNullable: true,
      }),
      statesFilter: new FormControl(statesFilter, {
        validators: Validators.required,
        nonNullable: true,
      }),
    });
  }
}
