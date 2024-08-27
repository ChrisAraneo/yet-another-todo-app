import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'yata-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  @Input() totalNumberOfItems: number = 0;

  @Output() onPageChange = new EventEmitter<number>();

  isFirstDisabled: boolean = true;
  isPrevDisabled: boolean = true;
  isNextDisabled: boolean = true;
  isLastDisabled: boolean = true;

  currentPage: number = 1;
  pages: number[] = [1];

  private itemsPerPage: number = 10;
  private maxPages: number = 11;

  ngOnChanges(changes: SimpleChanges): void {
    this.pages = Array.from(
      Array(Math.ceil(this.totalNumberOfItems / this.itemsPerPage)).keys(),
    ).map((_, index) => index + 1);

    // TODO Update pages
  }

  changePage(page: number): void {
    this.onPageChange.emit(page);
    this.currentPage = page;

    this.isFirstDisabled = page === 1;
    this.isPrevDisabled = page === 1;
    this.isNextDisabled = page === this.pages.length;
    this.isLastDisabled = page === this.pages.length;
  }
}
