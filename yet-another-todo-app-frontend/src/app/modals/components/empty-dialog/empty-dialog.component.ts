import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmptyDialogData } from './empty-dialog.types';

@Component({
  selector: 'yata-empty-dialog',
  templateUrl: './empty-dialog.component.html',
  styleUrls: ['./empty-dialog.component.scss'],
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
