import { Component, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'yata-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  date: Date | null;

  @Output() selectedDate: BehaviorSubject<Date | null>;

  constructor() {
    this.date = new Date();
    this.selectedDate = new BehaviorSubject<Date | null>(this.date);
  }

  changeSelectedDate(date: Date) {
    const localDate = this.toLocalDate(date);
    this.date = localDate;
    this.selectedDate.next(localDate);
  }

  private toLocalDate(date: Date): Date {
    return new Date(new Date().setTime(date.valueOf() - 60000 * date.getTimezoneOffset()));
  }
}
