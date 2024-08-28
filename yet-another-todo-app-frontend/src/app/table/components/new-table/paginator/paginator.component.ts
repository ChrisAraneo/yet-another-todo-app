import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

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
  private maxDisplayedPageButtons: number = 9;
  private lastPage: number = 1;

  ngOnChanges(): void {
    this.update();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.lastPage) {
      return;
    }

    this.onPageChange.emit(page);
    this.currentPage = page;

    this.update();
  }

  goToFirstPage(): void {
    this.goToPage(1);
  }

  goToLastPage(): void {
    this.goToPage(this.lastPage);
  }

  goToPrevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  goToNextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  private update(): void {
    this.lastPage = Math.ceil(this.totalNumberOfItems / this.itemsPerPage);

    if (this.maxDisplayedPageButtons > this.lastPage) {
      this.pages = Array.from(Array(this.lastPage).keys()).map((_, index) => index + 1);
    } else {
      const half = Math.floor(this.maxDisplayedPageButtons / 2);
      let min = this.currentPage - half < 1 ? 1 : this.currentPage - half;

      if (this.currentPage + half > this.lastPage) {
        min = this.lastPage - this.maxDisplayedPageButtons + 1;
      }

      this.pages = Array.from(Array(this.maxDisplayedPageButtons).keys()).map(
        (_, index) => min + index,
      );
    }

    this.isFirstDisabled = this.currentPage <= 1;
    this.isPrevDisabled = this.currentPage <= 1;
    this.isNextDisabled = this.currentPage >= this.lastPage;
    this.isLastDisabled = this.currentPage >= this.lastPage;
  }
}
