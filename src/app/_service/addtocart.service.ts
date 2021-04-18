import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { FrontendService } from './frontend.service';

@Injectable({
  providedIn: 'root'
})
export class AddtocartService {
  data:any;
  constructor(private _frontendService: FrontendService, private _cartservice:CartService) { }

  addTocart(product_name:any){
    sessionStorage.setItem('price_type', '0');
    const p_name = product_name.split(' ').join('+');
    this._frontendService.getProductDetails(p_name).subscribe(
      (res: any) => {
        this.data = res.data;
        if (this.data) {
          this._cartservice.addToCart(this.data, 1);
        } else {
          console.log('invalid product');
        }
      },
      (error: any) => {
        console.log(error);
      }
    )
    return true;
  }
}
