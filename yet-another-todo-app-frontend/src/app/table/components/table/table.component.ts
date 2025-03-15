import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { DialogService } from 'src/app/modals/services/dialog/dialog.service';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { ViewConfigurationService } from 'src/app/shared/services/view-configuration/view-configuration.service';
import { EndedTask, StartedTask, Task } from '../../../../../../yet-another-todo-app-shared';
import { TasksSorterService } from '../../services/tasks-sorter/tasks-sorter.service';
import { SortActive } from '../../services/tasks-sorter/tasks-sorter.types';
import { TasksDataSource } from '../../table.types';
import { TABLE_DISPLAYED_COLUMNS, TABLE_PAGE_SIZE_OPTIONS } from './table.config';

@Component({
    selector: 'yata-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    standalone: false
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSortDirective?: MatSort;

  readonly pageSizeOptions = TABLE_PAGE_SIZE_OPTIONS;
  readonly displayedColumns = TABLE_DISPLAYED_COLUMNS;

  data: MatTableDataSource<TasksDataSource> | undefined;
  sort: BehaviorSubject<MatSortable | null> = new BehaviorSubject<MatSortable | null>(null);

  private _data = new BehaviorSubject<MatTableDataSource<TasksDataSource> | undefined>(undefined);
  private search = new BehaviorSubject<string>('');
  private _sort = new BehaviorSubject<Sort>({ active: '', direction: 'asc' });
  private subscription!: Subscription;

  constructor(
    private tasksService: TasksService,
    private dateUtilsService: DateUtilsService,
    private dialogService: DialogService,
    private tasksSorterService: TasksSorterService,
    private viewConfigurationService: ViewConfigurationService,
  ) {}

  ngOnInit(): void {
    const tasks = this.tasksService
      .getTasks()
      .pipe(map((tasks) => this.mapToTasksDataSource(tasks)));

    const tasksSubscription = tasks.subscribe((tasks) => {
      this.updateTableDataSource(this.search.getValue(), this._sort.getValue(), tasks);
    });

    const sortingSubscription = this._sort.subscribe((sort: Sort) => {
      this.updateTableDataSource(this.search.getValue(), sort);
    });

    const searchSubscription = this.search.subscribe((text: string) => {
      this.updateTableDataSource(text, this._sort.getValue());
    });

    const sortConfigSubscription = this.viewConfigurationService
      .getTableConfiguration()
      .pipe(map((config) => config.sort))
      .subscribe((sort) => {
        this.sort.next(sort);

        if (sort !== null) {
          this.matSortDirective?.sort(sort);
        }
      });

    this.subscription = new Subscription();
    this.subscription.add(tasksSubscription);
    this.subscription.add(sortingSubscription);
    this.subscription.add(searchSubscription);
    this.subscription.add(sortConfigSubscription);
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (!!this.data) {
      this.data.paginator = this.paginator;
    }

    const sort = this.sort.getValue();

    if (sort !== null) {
      this.matSortDirective?.sort(sort);
    }
  }

  openEditTaskModal(taskId: string): void {
    this.dialogService.openEditTaskModal(taskId);
  }

  deleteTask(taskId: string): void {
    this.tasksService.hideTask(taskId);
  }

  onSearch(event: unknown): void {
    if (typeof event === 'string') {
      this.search.next(event);
    }
  }

  changeSort(sort: Sort): void {
    this._sort.next(sort);
  }

  private mapToTasksDataSource(tasks: Task[]): TasksDataSource[] {
    return tasks.map((task: Task) => {
      return {
        id: task.getId(),
        shortId: task.getShortId(),
        title: task.getTitle(),
        description: task.getDescription(),
        state: task.getState(),
        creationDate: this.formatDate(task.getCreationDate()),
        startDate: task instanceof StartedTask ? this.formatDate(task.getStartDate()) : '-',
        endDate: task instanceof EndedTask ? this.formatDate(task.getEndDate()) : '-',
      };
    });
  }

  private updateTableDataSource(search: string, sorting: Sort, tasks?: TasksDataSource[]): void {
    const array: TasksDataSource[] = tasks ? tasks : this._data.getValue()?.data || [];

    const filteredArray: TasksDataSource[] = array.filter((item) => {
      return this.taskToString(item).includes(search.toLocaleLowerCase());
    });

    const filteredAndSortedArray: TasksDataSource[] = this.tasksSorterService.sort(filteredArray, {
      active: sorting.active as SortActive,
      direction: sorting.direction,
    });

    this.data = new MatTableDataSource<TasksDataSource>(filteredAndSortedArray);

    if (!!this.paginator) {
      this.data.paginator = this.paginator;
    }

    this._data.next(this.data);
  }

  private formatDate(date: Date): string {
    return this.dateUtilsService.formatDate(date, 'dd-MM-yyyy');
  }

  private taskToString(task: TasksDataSource): string {
    return `${task.id} ${task.shortId} ${task.title} ${task.description} ${task.state.toString()} ${
      task.creationDate
    } ${task.startDate} ${task.endDate}`.toLocaleLowerCase();
  }
}
