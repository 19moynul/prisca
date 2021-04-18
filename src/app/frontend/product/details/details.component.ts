import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GlobalVariable } from '../../../global';
import { CartService } from '../../../_service/cart.service';
import { FrontendService } from '../../../_service/frontend.service';

@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  mainImage:any;
  quantity:number = 1;
  data: any;
  images: any[];
  imagePath = GlobalVariable.IMAGE_PATH;
  product_name:any;
  error_message:string;
  constructor(private _frontendService: FrontendService, private route: ActivatedRoute, private router: Router, private _cartservice:CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.product_name =  params.product_name
    })
    this.getData();
    // sessionStorage.setItem('items', null);
  }

  getData() {
    this._frontendService.getProductDetails(this.product_name).subscribe(
      (res: any) => {
        this.data = res.data,
        this.images = res.images
        this.mainImage = this.imagePath+this.data.main_image
        console.log(this.data);
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  changeImage(event){
    console.log(event.target.src);
    this.mainImage = event.target.src
  }

  increseQty(){
    if(this.quantity < 5){
      this.quantity = this.quantity+1;
    }
  }
  decreseQty(){
    if(this.quantity > 1){
      this.quantity = this.quantity-1;
    }
  }

  addToCart(){
    this.error_message = '';
    var price_type = sessionStorage.getItem('price_type');
    if(price_type=="1" || price_type=='2' || price_type =='3'){
      if (localStorage.getItem('token')) {
        this._cartservice.addToCart(this.data, this.quantity);
        this.router.navigate(['/cart'])
      } else {
        this.error_message = "Please login first to add this product in cart"
      }
    }else{
      this._cartservice.addToCart(this.data, this.quantity);
      this.router.navigate(['/cart'])
    }
  }



}
