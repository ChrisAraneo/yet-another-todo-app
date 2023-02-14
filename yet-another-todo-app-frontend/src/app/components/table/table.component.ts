import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, Subscription } from 'rxjs';
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

        if (!!this.paginator) {
          this.data.paginator = this.paginator;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
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
}
