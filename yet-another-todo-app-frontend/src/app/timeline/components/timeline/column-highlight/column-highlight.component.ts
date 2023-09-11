import { Component, Input, OnChanges } from '@angular/core';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';
import { UNIT } from 'src/app/shared/styles/theme';

@Component({
  selector: 'yata-column-highlight',
  templateUrl: './column-highlight.component.html',
  styleUrls: ['./column-highlight.component.scss'],
})
export class ColumnHighlightComponent implements OnChanges {
  @Input() highlightedDate: Date | null = null;
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;
  @Input() height: string = '0';

  left: string = '0';
  isHidden: boolean = false;

  constructor(private dateUtils: DateUtilsService) {}

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
      const numberOfDays = this.dateUtils.getNumberOfDaysBetweenDates(date, this.startDate);

      this.left = `${numberOfDays * 3 * UNIT - UNIT * 2}px`;
      this.isHidden = false;
    } else {
      this.left = `0`;
      this.isHidden = true;
    }
  }
}
