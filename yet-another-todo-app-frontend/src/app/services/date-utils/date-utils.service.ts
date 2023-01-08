import { Injectable } from '@angular/core';
import { addDays, format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class DateUtilsService {
  constructor() {}

  getAllDaysInMonth(today: Date): Date[] {
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    let date = new Date(currentYear, currentMonth, 1, 0, 0, 0, 0);
    const dates = [];

    while (date.getMonth() === currentMonth) {
      dates.push(date);
      date = addDays(date, 1);
    }

    return dates;
  }

  formatDate(date: Date, pattern: string): string {
    return format(date, pattern);
  }
}
