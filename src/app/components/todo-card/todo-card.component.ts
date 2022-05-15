import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yata-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent implements OnInit {
  title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
