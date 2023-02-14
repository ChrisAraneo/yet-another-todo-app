import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateUtilsService } from 'src/app/services/date-utils/date-utils.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'yata-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
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

  data: MatTableDataSource<Task> | undefined;

  constructor(
    private tasksService: TasksService,
    private dateUtilsService: DateUtilsService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.data = new MatTableDataSource<Task>(tasks);

      if (!!this.paginator) {
        this.data.paginator = this.paginator;
      }
    });
  }

  ngAfterViewInit() {
    if (!!this.data) {
      this.data.paginator = this.paginator;
    }
  }

  openEditTaskModal(taskId: string): void {
    this.dialogService.openEditTaskModal(taskId);
  }

  deleteTask(task: Task): void {
    this.tasksService.hideTask(task);
  }

  formatDate(date: Date): string {
    return this.dateUtilsService.formatDate(date, 'dd-MM-yyyy');
  }
}
