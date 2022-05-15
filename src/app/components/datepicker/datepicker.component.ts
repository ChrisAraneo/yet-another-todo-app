import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yata-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  selected: Date | null = null;

  constructor() {}

  ngOnInit(): void {}
}
