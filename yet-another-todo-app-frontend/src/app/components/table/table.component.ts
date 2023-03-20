import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { DateUtilsService } from 'src/app/services/date-utils/date-utils.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { EndedTask, StartedTask, Task } from '../../models/task.model';
import { TasksDataSource } from './table.types';

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

  data: MatTableDataSource<TasksDataSource> | undefined;
  filteredData: MatTableDataSource<TasksDataSource> | undefined; // TODO Refactor searching into observables
  search = new BehaviorSubject<string>('');

  private subscription!: Subscription;

  constructor(
    private tasksService: TasksService,
    private dateUtilsService: DateUtilsService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.tasksService
      .getTasks()
      .pipe(map((tasks) => this.mapToTasksDataSource(tasks)))
      .subscribe((tasks) => {
        this.data = new MatTableDataSource<TasksDataSource>(tasks);
        this.filteredData = this.data;

        if (!!this.paginator) {
          this.data.paginator = this.paginator;
          this.filteredData.paginator = this.paginator;
        }
      });

    this.subscription.add(
      this.search.subscribe((text) => {
        if (text === '' && this.data) {
          this.filteredData = this.data;

          if (!!this.paginator) {
            this.filteredData.paginator = this.paginator;
          }

          return;
        }

        this.filteredData = new MatTableDataSource<TasksDataSource>(
          this.data?.data.filter((item) => {
            const stringified = this.taskToString(item);

            return stringified.includes(text.toLocaleLowerCase());
          }),
        );

        if (!!this.paginator) {
          this.filteredData.paginator = this.paginator;
        }
      }),
    );
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

  onSearch(text: string): void {
    this.search.next(text);
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

  private formatDate(date: Date): string {
    return this.dateUtilsService.formatDate(date, 'dd-MM-yyyy');
  }

  private taskToString(task: TasksDataSource): string {
    return `${task.id} ${task.shortId} ${task.title} ${task.description} ${task.state.toString()} ${
      task.creationDate
    } ${task.startDate} ${task.endDate}`.toLocaleLowerCase();
  }
}
