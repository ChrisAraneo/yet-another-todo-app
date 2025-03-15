import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';
import { ViewConfigurationService } from 'src/app/shared/services/view-configuration/view-configuration.service';
import { TaskState } from '../../../../../../yet-another-todo-app-shared';
import {
  ConfigureTimelineForm,
  ConfigureTimelineModalData,
} from './configure-timeline-modal.types';

@Component({
    selector: 'yata-configure-timeline-modal',
    templateUrl: './configure-timeline-modal.component.html',
    styleUrls: ['./configure-timeline-modal.component.scss'],
    standalone: false
})
export class ConfigureTimelineModalComponent {
  static readonly PANEL_CLASS = 'configure-timeline-modal';

  readonly orderedStates: TaskState[];
  readonly filteredStates: TaskState[];

  form?: FormGroup<ConfigureTimelineForm>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfigureTimelineModalData,
    public dialogRef: MatDialogRef<ConfigureTimelineModalComponent>,
    private formBuilder: FormBuilder,
    private dateUtilsService: DateUtilsService,
    private viewConfigurationService: ViewConfigurationService,
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

    const startDate = new Date(this.form.value.startDate as string);
    const endDate = new Date(this.form.value.endDate as string);
    const statesOrder = this.form.value.statesOrder as TaskState[];
    const statesFilter = this.form.value.statesFilter as TaskState[];

    this.viewConfigurationService.changeTimelineStartDate(startDate);
    this.viewConfigurationService.changeTimelineEndDate(endDate);
    this.viewConfigurationService.changeTimelineColumnSorting(statesOrder);
    this.viewConfigurationService.changeTimelineFiltering(statesFilter);

    this.dialogRef.close();
  };

  cancel: () => void = () => {
    this.dialogRef.close();
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
      startDate: new FormControl(this.dateUtilsService.formatDate(startDate, 'yyyy-MM-dd'), {
        validators: [Validators.required],
        nonNullable: true,
      }),
      endDate: new FormControl(this.dateUtilsService.formatDate(endDate, 'yyyy-MM-dd'), {
        validators: [Validators.required],
        nonNullable: true,
      }),
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
