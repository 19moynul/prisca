import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeBannerListComponent } from './home-banner-list/home-banner-list.component';

@Component({
  selector: 'ngx-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {
  @ViewChild(HomeBannerListComponent) list:HomeBannerListComponent;
  constructor() { }

  ngOnInit(): void {
  }

  refresh() {
    this.list.refresh();
  }


}
