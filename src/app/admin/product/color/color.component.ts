import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'ngx-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  @ViewChild(ListComponent) list:ListComponent
  constructor() { }

  ngOnInit(): void {
  }

  refresh(){
    this.list.refresh();
  }

}
