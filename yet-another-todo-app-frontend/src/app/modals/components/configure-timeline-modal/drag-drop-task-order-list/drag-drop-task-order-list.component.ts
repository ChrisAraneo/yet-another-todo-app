import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { TaskStateCreator } from 'src/app/shared/models/task-state-creator.model';
import { TaskState } from '../../../../../../../yet-another-todo-app-shared';

@Component({
  selector: 'yata-drag-drop-task-order-list',
  templateUrl: './drag-drop-task-order-list.component.html',
  styleUrls: ['./drag-drop-task-order-list.component.scss'],
})
export class DragDropTaskOrderListComponent implements OnChanges {
  @Input() orderedStates: TaskState[] = [];
  @Input() filteredStates: TaskState[] = [];

  @Output() changeStatesOrder: EventEmitter<TaskState[]>;
  @Output() changeStatesFilter: EventEmitter<TaskState[]>;

  values: string[];
  checked: boolean[];

  constructor() {
    this.values = [];
    this.checked = [];
    this.changeStatesOrder = new EventEmitter<TaskState[]>();
    this.changeStatesFilter = new EventEmitter<TaskState[]>();
  }

  ngOnChanges(): void {
    const values = this.orderedStates.map((state: TaskState) => state.toString());

    this.values = values;
    this.checked = values.map(() => false);

    this.filteredStates
      .map((state: TaskState) => state.toString())
      .forEach((value: string) => {
        const index = values.indexOf(value);

        if (index >= 0) {
          this.checked[index] = true;
        }
      });
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.values, event.previousIndex, event.currentIndex);

    this.emitValues();
  }

  emitValues(): void {
    this.changeStatesOrder.next(
      [...this.values].map((value) => TaskStateCreator.create({ value })),
    );

    this.changeStatesFilter.next(
      [...this.values]
        .filter((_: string, index: number) => {
          return this.checked[index] === true;
        })
        .map((value) => TaskStateCreator.create({ value })),
    );
  }
}
