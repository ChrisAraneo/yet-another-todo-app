import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';

import { ImageComponent } from '../../../shared/components/image/image.component';
import { SubtitleComponent } from '../../../shared/components/subtitle/subtitle.component';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { ModalActionButtonsComponent } from '../modal-action-buttons/modal-action-buttons.component';
import { EmptyDialogData } from './empty-dialog.types';

@Component({
  selector: 'yata-empty-dialog',
  templateUrl: './empty-dialog.component.html',
  styleUrl: './empty-dialog.component.scss',
  standalone: true,
  imports: [
    ImageComponent,
    TitleComponent,
    SubtitleComponent,
    ModalActionButtonsComponent,
    TranslatePipe,
    NgIf,
  ],
})
export class EmptyDialogComponent implements OnInit {
  static readonly PANEL_CLASS = 'empty-dialog';

  titleKey!: string;
  hintKey!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EmptyDialogData,
    public dialogReference: MatDialogRef<EmptyDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.titleKey = this.data.titleKey;
    this.hintKey = this.data.hintKey;
  }

  close = async (): Promise<void> => {
    this.dialogRef.close();
  };
}
