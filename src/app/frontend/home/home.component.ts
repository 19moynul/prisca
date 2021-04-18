import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../master/navbar/navbar.component';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(NavbarComponent) nav:NavbarComponent;
  constructor() { }

  ngOnInit(): void {
  }

  refreshCartCount(){
    this.nav.calculateCartItem();
    console.log('kere')
  }

}
