import { Component, Input, OnChanges } from '@angular/core';
import { DateUtilsService } from '../../../../shared/services/date-utils/date-utils.service';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { UNIT } from '@chris.araneo/yet-another-todo-app-shared';

@Component({
  selector: 'yata-column-highlight',
  templateUrl: './column-highlight.component.html',
  styleUrl: './column-highlight.component.scss',
  standalone: true,
  imports: [NgIf, NgClass, NgStyle]
})
export class ColumnHighlightComponent implements OnChanges {
  @Input() highlightedDate: Date | null = null;
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;
  @Input() height = '0';

  left = '0';
  isHidden = false;

  constructor(private readonly dateUtils: DateUtilsService) {}

  ngOnChanges(): void {
    this.updateHighlightedColumn();
  }

  private updateHighlightedColumn(): void {
    const date = this.highlightedDate;

    if (
      date &&
      this.startDate &&
      this.endDate &&
      +date >= +this.startDate &&
      +date < +this.dateUtils.getNextDay(this.endDate)
    ) {
      const numberOfDays = this.dateUtils.getNumberOfDaysBetweenDates(
        date,
        this.startDate,
      );

      this.left = `${numberOfDays * 3 * UNIT - UNIT * 2}px`;
      this.isHidden = false;
    } else {
      this.left = `0`;
      this.isHidden = true;
    }
  }
}
