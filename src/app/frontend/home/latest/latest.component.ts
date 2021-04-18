import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../../global';
import { AddtocartService } from '../../../_service/addtocart.service';
import { FrontendService } from '../../../_service/frontend.service';

@Component({
  selector: 'ngx-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit {

  data:any[];
  imagePath = GlobalVariable.IMAGE_PATH;
  @Output() refreshCartCount: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _frontendService: FrontendService, private router: Router, private addtocartservice:AddtocartService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._frontendService.getLatestProduct().subscribe(
      (res: any) => {
        this.data = res.data
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  productDetails(product_name:any, price_type:any){
    const name = product_name.split(' ').join('+');;
    sessionStorage.setItem('price_type',price_type);
    this.router.navigate(['product/', name])
  }


  addToCart(product_name: any) {
    if (this.addtocartservice.addTocart(product_name)) {
      setTimeout(() => {
        this.refreshCartCount.emit();
      }, 1000);
    }
  }


}
