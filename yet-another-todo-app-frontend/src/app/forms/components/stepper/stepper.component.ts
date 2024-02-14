import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from './stepper.types';

@Component({
  selector: 'yata-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @Input() steps: Step[] = [];
  @Input('activeIndex') initialIndex: number = 0;

  @Output() changeIndex = new EventEmitter<number>();

  activeIndex!: number;

  ngOnInit(): void {
    this.activeIndex = this.initialIndex;
  }

  onClick(index: number): void {
    this.activeIndex = index;
    this.changeIndex.next(index);
  }
}
