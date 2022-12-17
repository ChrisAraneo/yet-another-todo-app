import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'yata-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit {
  @Input() isOpened: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
