import { AsyncPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  Subject,
  tap,
} from 'rxjs';

import { LabelComponent } from '../../../shared/components/label/label.component';
import { TaskStateIconComponent } from '../../../shared/components/task-state-icon/task-state-icon.component';
import { DateUtilsService } from '../../../shared/services/date-utils/date-utils.service';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';
import { TasksService } from '../../../shared/services/tasks/tasks.service';
import { TasksDataSource } from '../../table.types';
import {
  TABLE_MAX_DISPLAYED_PAGINATOR_OPTIONS,
  TABLE_PAGE_SIZE_OPTIONS,
} from '../table/table.config';
import { PaginatorComponent } from './paginator/paginator.component';
import { RouterOutlet } from '@angular/router';
import { StartedTask, EndedTask } from '@chris.araneo/yet-another-todo-app-models';
import { UNIT } from '../../../shared/styles/theme.__generated';

@Component({
  selector: 'yata-new-table',
  standalone: true,
  imports: [
    AsyncPipe,
    LabelComponent,
    MatButtonModule,
    MatIconModule,
    NgFor,
    NgIf,
    NgStyle,
    PaginatorComponent,
    RouterOutlet,
    TaskStateIconComponent,
    TranslatePipe,
  ],
  templateUrl: './new-table.component.html',
  styleUrl: './new-table.component.scss',
})
export class NewTableComponent implements OnInit {
  readonly pageSizeOptions = TABLE_PAGE_SIZE_OPTIONS;

  data!: Observable<TasksDataSource[]>;
  totalNumberOfItems = 0;
  pageSize!: Subject<number>;
  currentPage!: Subject<number>;
  gridTemplateRows = {
    'grid-template-rows': `repeat(${this.pageSizeOptions[0]}, ${UNIT})`,
  };
  maxDisplayedPageButtons: number = TABLE_MAX_DISPLAYED_PAGINATOR_OPTIONS;

  constructor(
    private readonly tasksService: TasksService,
    private readonly dateUtilsService: DateUtilsService,
    private readonly navigationService: NavigationService,
  ) {}

  @HostListener('window:resize', ['$event.target.innerWidth'])
  updateMaxDisplayedPageButtons(width: number): void {
    if (width > 1450) {
      this.maxDisplayedPageButtons = TABLE_MAX_DISPLAYED_PAGINATOR_OPTIONS;
    } else if (width > 1200) {
      this.maxDisplayedPageButtons = Math.ceil(
        TABLE_MAX_DISPLAYED_PAGINATOR_OPTIONS / 2,
      );
    } else {
      this.maxDisplayedPageButtons = Math.ceil(
        TABLE_MAX_DISPLAYED_PAGINATOR_OPTIONS / 4,
      );
    }
  }

  ngOnInit(): void {
    this.pageSize = new BehaviorSubject<number>(this.pageSizeOptions[0]); // TODO Store page sizes in param
    this.currentPage = new BehaviorSubject<number>(1); // TODO Store current page in param

    this.data = combineLatest([
      this.pageSize.asObservable(),
      this.currentPage.asObservable(),
      this.tasksService.getTasks(),
    ]).pipe(
      tap((input) => {
        this.totalNumberOfItems = input[2]?.length;
      }),
      map(([pageSize, currentPage, tasks]) =>
        tasks
          .map((task) => ({
            id: task.getId(),
            shortId: task.getShortId(),
            title: task.getTitle(),
            description: task.getDescription(),
            state: task.getState(),
            creationDate: this.formatDate(task.getCreationDate()),
            startDate:
              task instanceof StartedTask
                ? this.formatDate(task.getStartDate())
                : '-',
            endDate:
              task instanceof EndedTask
                ? this.formatDate(task.getEndDate())
                : '-',
          }))
          .slice((currentPage - 1) * pageSize, currentPage * pageSize),
      ),
    );

    this.updateMaxDisplayedPageButtons(window.innerWidth);
  }

  changePage(page: number): void {
    this.currentPage.next(page);
  }

  changePageSize(pageSize: number): void {
    this.pageSize.next(pageSize);
  }

  editTask(id: string): void {
    this.navigationService.navigateToEditTaskRoute(id);
    // TODO Update side nav item
  }

  deleteTask(id: string): void {
    this.navigationService.navigateToDeleteTaskRoute(id);
    // TODO Update side nav item
  }

  // TODO Pipe
  private formatDate(date: Date): string {
    return this.dateUtilsService.formatDate(date, 'yyyy-MM-dd HH:mm');
  }
}
