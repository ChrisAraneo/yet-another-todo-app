import { Injectable } from '@angular/core';
import { format, getDaysInMonth } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class DateUtilsService {
  constructor() {}

  getAllDaysInMonth(today: Date): Date[] {
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const numberOfDaysInMonth = getDaysInMonth(today);

    return [...Array(numberOfDaysInMonth).keys()].map((n: number) => {
      return new Date(currentYear, currentMonth, n + 1, 0, 0, 0, 0);
    });
  }

  getFirstDayOfTheMonth(today: Date): Date {
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    return new Date(currentYear, currentMonth, 1, 0, 0, 0, 0);
  }

  getLastDayOfTheMonth(today: Date): Date {
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const numberOfDaysInMonth = getDaysInMonth(today);

    return new Date(currentYear, currentMonth, numberOfDaysInMonth, 0, 0, 0, 0);
  }

  formatDate(date: Date, pattern: string): string {
    return format(date, pattern);
  }
}
