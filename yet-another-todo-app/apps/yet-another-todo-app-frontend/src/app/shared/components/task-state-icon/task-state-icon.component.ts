import { NgStyle } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';

import { TaskState } from '../../../../../../yet-another-todo-app-shared';

@Component({
  selector: 'yata-task-state-icon',
  templateUrl: './task-state-icon.component.html',
  styleUrls: ['./task-state-icon.component.scss'],
  standalone: true,
  imports: [MatIcon, NgStyle, MatTooltip, TranslatePipe],
})
export class TaskStateIconComponent implements OnChanges {
  @Input() state!: TaskState;
  @Input() size = 22;
  @Input() opacity = 1;

  iconName?: string;
  style?: Record<string, string | number>;
  value = '';

  ngOnChanges(changes: SimpleChanges): void {
    const currentState = changes['state'] && changes['state'].currentValue;
    const previousState = changes['state'] && changes['state'].previousValue;
    const currentSize = changes['size'] && changes['size'].currentValue;
    const previousSize = changes['size'] && changes['size'].previousValue;
    const currentOpacity =
      changes['opacity'] && changes['opacity'].currentValue;
    const previousOpacity =
      changes['opacity'] && changes['opacity'].previousValue;

    if (currentState !== previousState) {
      this.updateIconName(currentState);
      this.updateTaskStateValue(currentState);
    }

    if (
      currentState !== previousState ||
      currentSize !== previousSize ||
      currentOpacity !== previousOpacity
    ) {
      this.updateStyle(currentState, currentSize, currentOpacity);
    }
  }

  private updateIconName(state: TaskState): void {
    this.iconName = state.getRelatedIconName();
  }

  private updateStyle(state: TaskState, size: number, opacity: number): void {
    const sizeInPx = size + 'px';
    const color = state.getRelatedColor();

    this.style = {
      width: sizeInPx,
      height: sizeInPx,
      'font-size': sizeInPx,
      'line-height': sizeInPx,
      fill: color,
      color: color,
      opacity: opacity,
    };
  }

  private updateTaskStateValue(state: TaskState): void {
    this.value = state.toString();
  }
}
