import { Injectable } from '@angular/core';
import { add, format, getDaysInMonth, sub } from 'date-fns';

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

  getFirstDayOfThePreviousMonth(today: Date): Date {
    const firstDayOfCurrentMonth = this.getFirstDayOfTheMonth(today);
    const dayInPreviousMonth = sub(firstDayOfCurrentMonth, { days: 1 });

    return this.getFirstDayOfTheMonth(dayInPreviousMonth);
  }

  getFirstDayOfTheNextMonth(today: Date): Date {
    const lastDayOfCurrentMonth = this.getLastDayOfTheMonth(today);
    const dayInNextMonth = add(lastDayOfCurrentMonth, { days: 1 });

    return this.getFirstDayOfTheMonth(dayInNextMonth);
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
