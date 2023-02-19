import { Injectable } from '@angular/core';
import { add, format, getDaysInMonth, sub } from 'date-fns';
import differenceInDays from 'date-fns/differenceInDays';

@Injectable({
  providedIn: 'root',
})
export class DateUtilsService {
  constructor() {}

  getAllDaysInPeriodOfTime(startDate: Date, endDate: Date): Date[] {
    const difference = Math.abs(this.getNumberOfDaysBetweenDates(endDate, startDate));

    return [...Array(difference).keys()].map((n: number) => {
      return add(this.getDateAtNoon(startDate), { days: n });
    });
  }

  getAllDaysInMonth(today: Date): Date[] {
    return this.getAllDaysInPeriodOfTime(
      this.getFirstDayOfTheMonth(today),
      this.getLastDayOfTheMonth(today),
    );
  }

  getNumberOfDaysBetweenDates(startDate: Date, endDate: Date): number {
    return (
      Math.abs(differenceInDays(this.getDateAtNoon(endDate), this.getDateAtNoon(startDate))) + 1
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
    const numberOfDaysInMonth = getDaysInMonth(today);

    return new Date(today.getFullYear(), today.getMonth(), numberOfDaysInMonth, 0, 0, 0, 0);
  }

  formatDate(date: Date, pattern: string): string {
    return format(date, pattern);
  }

  private getDateAtNoon(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  }
}
