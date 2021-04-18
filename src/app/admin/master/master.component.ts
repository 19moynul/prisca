import { Component, OnInit } from '@angular/core';
import { Menu } from './menu';

@Component({
  selector: 'ngx-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  menu=""
  constructor() { }

  ngOnInit(): void {
    this.menu = Menu
  }

}
