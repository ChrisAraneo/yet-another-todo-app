import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { DialogService } from 'src/app/modals/services/dialog/dialog.service';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { EndedTask, StartedTask, Task } from '../../../shared/models/task.model';
import { TasksSorterService } from '../../services/tasks-sorter/tasks-sorter.service';
import { SortActive } from '../../services/tasks-sorter/tasks-sorter.types';
import { TasksDataSource } from '../../table.types';

@Component({
  selector: 'yata-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly pageSizeOptions = [15, 30, 50];
  readonly displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'state',
    'creationDate',
    'startDate',
    'endDate',
    'actions',
  ];

  data: MatTableDataSource<TasksDataSource> | undefined; // TODO Refactor searching into observables

  private _data = new BehaviorSubject<MatTableDataSource<TasksDataSource> | undefined>(undefined);
  private search = new BehaviorSubject<string>('');
  private sort = new BehaviorSubject<Sort>({ active: '', direction: 'asc' });
  private subscription!: Subscription;

  constructor(
    private tasksService: TasksService,
    private dateUtilsService: DateUtilsService,
    private dialogService: DialogService,
    private tasksSorterService: TasksSorterService,
  ) {}

  ngOnInit(): void {
    const tasks = this.tasksService
      .getTasks()
      .pipe(map((tasks) => this.mapToTasksDataSource(tasks)));

    const tasksSubscription = tasks.subscribe((tasks) => {
      this.updateTableDataSource(this.search.getValue(), this.sort.getValue(), tasks);
    });

    const sortingSubscription = this.sort.subscribe((sort: Sort) => {
      this.updateTableDataSource(this.search.getValue(), sort);
    });

    const searchSubscription = this.search.subscribe((text: string) => {
      this.updateTableDataSource(text, this.sort.getValue());
    });

    this.subscription = new Subscription();
    this.subscription.add(tasksSubscription);
    this.subscription.add(sortingSubscription);
    this.subscription.add(searchSubscription);
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (!!this.data) {
      this.data.paginator = this.paginator;
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
    this.sort.next(sort);
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
