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
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { SelectComponent } from '../../../forms/components/select/select.component';
import { Option } from '../../../forms/components/select/select.types';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { ViewConfigurationService } from '../../../shared/services/view-configuration/view-configuration.service';
import { ModalActionButtonsComponent } from '../modal-action-buttons/modal-action-buttons.component';
import {
  ConfigureTableForm,
  SortDirection,
} from './configure-table-modal.types';

const TABLE_DISPLAYED_COLUMNS: string[] = []; // TODO

@Component({
  selector: 'yata-configure-table-modal',
  standalone: true,
  imports: [
    FormsModule,
    ModalActionButtonsComponent,
    NgIf,
    ReactiveFormsModule,
    SelectComponent,
    TitleComponent,
    TranslatePipe,
  ],
  templateUrl: './configure-table-modal.component.html',
  styleUrl: './configure-table-modal.component.scss',
})
export class ConfigureTableModalComponent {
  static readonly PANEL_CLASS = 'configure-table-modal';

  form?: FormGroup<ConfigureTableForm>;
  ids: Option<string>[] = [];
  directions: Option<SortDirection>[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogReference: MatDialogRef<ConfigureTableModalComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly translateService: TranslateService,
    private readonly viewConfigurationService: ViewConfigurationService,
  ) {
    const id = this.getIdFromData(this.data);
    const direction = this.getDirectionFromData(this.data);

    this.initializeIds();
    this.initializeDirections();
    this.initializeForm(id, direction);
  }

  submit: () => Promise<void> = async () => {
    if (this.form === undefined || this.form?.invalid) {
      return;
    }

    const id = this.form.value.id || '';
    const direction = this.form.value.direction || 'asc';

    this.viewConfigurationService.changeTableSorting({
      id,
      start: direction,
      disableClear: false,
    });

    this.dialogReference.close();
  };

  cancel: () => void = () => {
    this.dialogReference.close();
  };

  private getIdFromData(data: any): string {
    return data?.id || '';
  }

  private getDirectionFromData(data: any): SortDirection {
    const direction = data?.direction;

    if (direction !== 'asc' && direction !== 'desc') {
      throw new Error(`Incorrect data object direction: ${direction}`);
    }

    return direction;
  }

  private initializeIds(): void {
    this.ids = TABLE_DISPLAYED_COLUMNS.filter((name) => name !== 'actions').map(
      (name) => ({
        label: this.translateService.instant(`Table.${name}`.toString()),
        value: name,
      }),
    );
  }

  private initializeDirections(): void {
    this.directions = [
      {
        label: this.translateService.instant(
          `ConfigureTableModal.asc`.toString(),
        ),
        value: 'asc',
      },
      {
        label: this.translateService.instant(
          `ConfigureTableModal.desc`.toString(),
        ),
        value: 'desc',
      },
    ];
  }

  private initializeForm(id: string, direction: SortDirection): void {
    this.form = this.formBuilder.group<ConfigureTableForm>({
      id: new FormControl(id, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      direction: new FormControl(direction, {
        nonNullable: true,
      }),
    });
  }
}
