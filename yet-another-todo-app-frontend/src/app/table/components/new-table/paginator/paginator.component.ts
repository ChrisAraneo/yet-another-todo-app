import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { Option } from '../../../../forms/components/select/select.types';
import {
  TABLE_MAX_DISPLAYED_PAGINATOR_OPTIONS,
  TABLE_PAGE_SIZE_OPTIONS,
} from '../../table/table.config';

@Component({
  selector: 'yata-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges, OnInit, OnDestroy {
  @Input() totalNumberOfItems: number = 0;

  @Output() changePage = new EventEmitter<number>();
  @Output() changePageSize = new EventEmitter<number>();

  pageSizeOptions!: Observable<Option<number>[]>;

  isFirstDisabled: boolean = true;
  isPrevDisabled: boolean = true;
  isNextDisabled: boolean = true;
  isLastDisabled: boolean = true;

  currentPage: number = 1;
  pages: number[] = [1];

  select!: FormControl<number>;

  private readonly maxDisplayedPaginatorOptions: number = TABLE_MAX_DISPLAYED_PAGINATOR_OPTIONS;

  private pageSize: number = TABLE_PAGE_SIZE_OPTIONS[0]; // TODO Query param
  private lastPage: number = 1;
  private subscription?: Subscription;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.select = new FormControl(this.pageSize, { nonNullable: true });

    this.subscription = this.select.valueChanges.subscribe((value) => {
      this.pageSize = value;
      this.changePageSize.next(value);
      this.update();
    });

    this.pageSizeOptions = combineLatest(
      TABLE_PAGE_SIZE_OPTIONS.map((size) =>
        this.translateService.get('Paginator.itemsPerPage', { 1: size }),
      ),
    ).pipe(
      map((translations) =>
        translations.map((translation, index) => ({
          label: translation,
          value: TABLE_PAGE_SIZE_OPTIONS[index],
        })),
      ),
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnChanges(): void {
    this.update();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.lastPage) {
      return;
    }

    this.changePage.emit(page);
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
    this.lastPage = Math.ceil(this.totalNumberOfItems / this.pageSize);

    if (this.currentPage > this.lastPage) {
      this.goToPage(this.lastPage);

      return;
    }

    if (this.maxDisplayedPaginatorOptions > this.lastPage) {
      this.pages = Array.from(Array(this.lastPage).keys()).map((_, index) => index + 1);
    } else {
      const half = Math.floor(this.maxDisplayedPaginatorOptions / 2);
      let min = this.currentPage - half < 1 ? 1 : this.currentPage - half;

      if (this.currentPage + half > this.lastPage) {
        min = this.lastPage - this.maxDisplayedPaginatorOptions + 1;
      }

      this.pages = Array.from(Array(this.maxDisplayedPaginatorOptions).keys()).map(
        (_, index) => min + index,
      );
    }

    this.isFirstDisabled = this.currentPage <= 1;
    this.isPrevDisabled = this.currentPage <= 1;
    this.isNextDisabled = this.currentPage >= this.lastPage;
    this.isLastDisabled = this.currentPage >= this.lastPage;
  }
}
