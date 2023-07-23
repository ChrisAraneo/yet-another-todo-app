import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';
import { ViewConfigurationService } from 'src/app/shared/services/view-configuration/view-configuration.service';
import { ConfigureTimelineForm } from './configure-timeline-modal.types';

@Component({
  selector: 'yata-configure-timeline-modal',
  templateUrl: './configure-timeline-modal.component.html',
  styleUrls: ['./configure-timeline-modal.component.scss'],
})
export class ConfigureTimelineModalComponent {
  static readonly PANEL_CLASS = 'configure-timeline-modal';

  form?: FormGroup<ConfigureTimelineForm>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfigureTimelineModalComponent>,
    private formBuilder: FormBuilder,
    private dateUtilsService: DateUtilsService,
    private viewConfigurationService: ViewConfigurationService,
  ) {
    const { startDate, endDate } = this.getDatesFromData(this.data);

    this.initializeForm(startDate, endDate);
  }

  submit: () => Promise<void> = async () => {
    if (this.form === undefined || this.form?.invalid) {
      return;
    }

    const startDate = new Date(this.form.value.startDate as string);
    const endDate = new Date(this.form.value.endDate as string);

    this.viewConfigurationService.changeTimelineStartDate(startDate);
    this.viewConfigurationService.changeTimelineEndDate(endDate);

    this.dialogRef.close();
  };

  cancel: () => void = () => {
    this.dialogRef.close();
  };

  private getDatesFromData(data: any): { startDate: Date; endDate: Date } {
    const { startDate, endDate } = data;

    if (!(startDate instanceof Date)) {
      throw Error(`Start date is incorrect date object: ${startDate}`);
    }

    if (!(endDate instanceof Date)) {
      throw Error(`End date is incorrect date object: ${endDate}`);
    }

    return {
      startDate,
      endDate,
    };
  }

  private initializeForm(startDate: Date, endDate: Date): void {
    this.form = this.formBuilder.group<ConfigureTimelineForm>({
      startDate: new FormControl(this.dateUtilsService.formatDate(startDate, 'yyyy-MM-dd'), {
        validators: [Validators.required],
        nonNullable: true,
      }),
      endDate: new FormControl(this.dateUtilsService.formatDate(endDate, 'yyyy-MM-dd'), {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }
}
