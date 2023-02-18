import { Injectable } from '@angular/core';
import { add, format, getDaysInMonth, sub } from 'date-fns';
import differenceInDays from 'date-fns/differenceInDays';

@Injectable({
  providedIn: 'root',
})
export class DateUtilsService {
  constructor() {}

  getAllDaysInPeriodOfTime(startDate: Date, endDate: Date): Date[] {
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const date = startDate.getDate();

    const difference = Math.abs(differenceInDays(endDate, startDate)) + 1;

    return [...Array(difference).keys()].map((n: number) => {
      return add(new Date(year, month, date, 0, 0, 0, 0), { days: n });
    });
  }

  getDifferenceInDays(startDate: Date, endDate: Date): number {
    // TODO Unit tests
    return Math.abs(differenceInDays(startDate, endDate));
  }

  getAllDaysInMonth(today: Date): Date[] {
    return this.getAllDaysInPeriodOfTime(
      this.getFirstDayOfTheMonth(today),
      this.getLastDayOfTheMonth(today),
    );
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
