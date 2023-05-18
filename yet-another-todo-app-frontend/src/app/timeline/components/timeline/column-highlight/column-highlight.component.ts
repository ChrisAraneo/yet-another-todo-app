import { Component, Input, OnChanges } from '@angular/core';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';
import { UNIT } from 'src/app/shared/styles/theme';

@Component({
  selector: 'yata-column-highlight',
  templateUrl: './column-highlight.component.html',
  styleUrls: ['./column-highlight.component.scss'],
})
export class ColumnHighlightComponent implements OnChanges {
  @Input() highlightedDate?: Date;
  @Input() startDate?: Date;
  @Input() endDate?: Date;
  @Input() height: string = '0';

  left: string = '0';

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
      +date <= +this.endDate
    ) {
      this.left = `${
        (this.dateUtils.getNumberOfDaysBetweenDates(date, this.startDate) + 1) * UNIT * 3
      }px`;
    } else {
    }
  }
}
