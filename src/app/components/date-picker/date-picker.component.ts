import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yata-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  selected: Date | null = null;

  constructor() {}

  ngOnInit(): void {}
}
