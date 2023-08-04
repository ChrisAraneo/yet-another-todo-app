import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TaskStateCreator } from 'src/app/shared/models/task-state-creator.model';
import { TaskState } from 'src/app/shared/models/task-state.model';

@Component({
  selector: 'yata-drag-drop-task-order-list',
  templateUrl: './drag-drop-task-order-list.component.html',
  styleUrls: ['./drag-drop-task-order-list.component.scss'],
})
export class DragDropTaskOrderListComponent implements OnChanges {
  @Input() states: TaskState[] = [];

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

  ngOnChanges(changes: SimpleChanges): void {
    const values = changes['states']?.currentValue.map((state: TaskState) => state.toString());

    this.values = values;

    while (this.checked.length > values.length) {
      this.checked.pop();
    }

    while (this.checked.length < values.length) {
      this.checked.push(true);
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.values, event.previousIndex, event.currentIndex);

    this.emitValues();
  }

  emitValues(): void {
    this.changeStatesOrder.next([...this.values].map((value) => TaskStateCreator.create(value)));

    this.changeStatesFilter.next(
      [...this.values]
        .filter((_: string, index: number) => {
          return this.checked[index] === true;
        })
        .map((value) => TaskStateCreator.create(value)),
    );
  }
}
