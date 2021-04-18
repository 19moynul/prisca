import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';
import { FrontendService } from '../../_service/frontend.service';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  data: any[];
  imagePath = GlobalVariable.IMAGE_PATH;
  constructor(private _frontendService: FrontendService,private router:Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._frontendService.getProduct().subscribe(
      (res: any) => {
        this.data = res.data
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  productDetails(product_name: any, price_type: any) {
    const name = product_name.split(' ').join('+');;
    sessionStorage.setItem('price_type', price_type);
    this.router.navigate(['product/', name])
  }

}
