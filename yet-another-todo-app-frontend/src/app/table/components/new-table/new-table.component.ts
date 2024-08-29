import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, Subject, tap } from 'rxjs';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { UNIT } from 'src/app/shared/styles/theme.__generated';
import { EndedTask, StartedTask } from '../../../../../../yet-another-todo-app-shared';
import { TasksDataSource } from '../../table.types';
import { TABLE_PAGE_SIZE_OPTIONS } from '../table/table.config';

@Component({
  selector: 'yata-new-table',
  templateUrl: './new-table.component.html',
  styleUrls: ['./new-table.component.scss'],
})
export class NewTableComponent implements OnInit {
  readonly pageSizeOptions = TABLE_PAGE_SIZE_OPTIONS;

  data!: Observable<TasksDataSource[]>;
  totalNumberOfItems: number = 0;
  pageSize!: Subject<number>;
  currentPage!: Subject<number>;
  gridTemplateRows = {
    'grid-template-rows': `repeat(${this.pageSizeOptions[0] + 1}, ${UNIT})`,
  };

  constructor(
    private readonly tasksService: TasksService,
    private readonly dateUtilsService: DateUtilsService,
  ) {}

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
            startDate: task instanceof StartedTask ? this.formatDate(task.getStartDate()) : '-',
            endDate: task instanceof EndedTask ? this.formatDate(task.getEndDate()) : '-',
          }))
          .slice((currentPage - 1) * pageSize, currentPage * pageSize),
      ),
    );
  }

  // TODO Pipe
  private formatDate(date: Date): string {
    return this.dateUtilsService.formatDate(date, 'yyyy-MM-dd HH:mm');
  }
}
