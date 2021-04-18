import { Component, OnInit, ViewChild } from '@angular/core';
import { FooterCardListComponent } from './footer-card-list/footer-card-list.component';

@Component({
  selector: 'ngx-footer-card',
  templateUrl: './footer-card.component.html',
  styleUrls: ['./footer-card.component.scss']
})
export class FooterCardComponent implements OnInit {

  @ViewChild(FooterCardListComponent) footercardlist:FooterCardListComponent
  constructor() { }

  ngOnInit(): void {
  }

  refresh(){
    this.footercardlist.refresh();
  }

}
