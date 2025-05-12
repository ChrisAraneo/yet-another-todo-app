import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmptyDialogData } from './empty-dialog.types';
import { ImageComponent } from '../../../shared/components/image/image.component';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { SubtitleComponent } from '../../../shared/components/subtitle/subtitle.component';
import { ModalActionButtonsComponent } from '../modal-action-buttons/modal-action-buttons.component';
import { TranslatePipe } from '@ngx-translate/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'yata-empty-dialog',
  templateUrl: './empty-dialog.component.html',
  styleUrls: ['./empty-dialog.component.scss'],
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
    public dialogRef: MatDialogRef<EmptyDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.titleKey = this.data.titleKey;
    this.hintKey = this.data.hintKey;
  }

  close = async (): Promise<void> => {
    this.dialogRef.close();
  };
}
