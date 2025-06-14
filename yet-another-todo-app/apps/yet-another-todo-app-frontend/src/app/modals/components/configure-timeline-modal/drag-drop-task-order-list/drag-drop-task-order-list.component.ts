import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslatePipe } from '@ngx-translate/core';
import { forEach } from 'lodash';

import {
  TaskState,
  TaskStateCreator,
} from '../../../../../../../yet-another-todo-app-shared';
import { LabelComponent } from '../../../../shared/components/label/label.component';
import { TaskStateCreatorService } from '../../../../shared/services/task-state-creator/task-state-creator.service';

@Component({
  selector: 'yata-drag-drop-task-order-list',
  standalone: true,
  imports: [
    CdkDrag,
    FormsModule,
    LabelComponent,
    MatCheckboxModule,
    TranslatePipe,
  ],
  templateUrl: './drag-drop-task-order-list.component.html',
  styleUrl: './drag-drop-task-order-list.component.scss',
})
export class DragDropTaskOrderListComponent implements OnChanges {
  @Input() orderedStates: TaskState[] = [];
  @Input() filteredStates: TaskState[] = [];

  @Output()
  changeStatesOrder: EventEmitter<TaskState[]>;
  @Output()
  changeStatesFilter: EventEmitter<TaskState[]>;

  values: string[];
  checked: boolean[];

  constructor(private readonly taskStateCreator: TaskStateCreatorService) {
    this.values = [];
    this.checked = [];
    this.changeStatesOrder = new EventEmitter<TaskState[]>();
    this.changeStatesFilter = new EventEmitter<TaskState[]>();
  }

  ngOnChanges(): void {
    const values = this.orderedStates.map((state: TaskState) =>
      state.toString(),
    );

    this.values = values;
    this.checked = values.map(() => false);

    forEach(
      this.filteredStates.map((state: TaskState) => state.toString()),
      (value: string) => {
        const index = values.indexOf(value);

        if (index !== -1) {
          this.checked[index] = true;
        }
      },
    );
  }

  drop(event: unknown): void {
    moveItemInArray(
      this.values,
      (event as CdkDragDrop<string[]>).previousIndex,
      (event as CdkDragDrop<string[]>).currentIndex,
    );

    this.emitValues();
  }

  emitValues(): void {
    this.changeStatesOrder.next(
      [...this.values].map((value) =>
        this.taskStateCreator.create({
          value,
        }),
      ),
    );

    this.changeStatesFilter.next(
      [...this.values]
        .filter((_: string, index: number) => this.checked[index])
        .map((value) =>
          TaskStateCreator.create({
            value,
          }),
        ),
    );
  }
}
