import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items:any[] = [];
  constructor() { }

  addToCart(product: any, quantity:number){

    if (localStorage.getItem('items')){
      this.items = JSON.parse(localStorage.getItem('items'));
    }
    console.log(this.items);
    let itemExist = false;
    for (let i in this.items) {
      if (this.items[i].product_id === product.id) {
        this.items[i].quantity=quantity
        this.items[i].price=product.price
        itemExist=true;
        localStorage.setItem('items', JSON.stringify(this.items));
        break;
      }
    }
    if(!itemExist){
      var item = {
        product_id: product.id,
        product_name: product.product_name,
        quantity: quantity,
        price: product.price,
      }
      this.items.push(item);
      localStorage.setItem('items', JSON.stringify(this.items));
    }
  }

  addQty(item:any){
    if (localStorage.getItem('items')){
      this.items = JSON.parse(localStorage.getItem('items'));
    }
    for (let i in this.items) {
      if (this.items[i].product_id === item.product_id) {
        if (this.items[i].quantity >= 0){
          this.items[i].quantity++
          localStorage.setItem('items', JSON.stringify(this.items));
        }
        break;
      }
    }
  }
  removeQty(item:any){
    if (localStorage.getItem('items')){
      this.items = JSON.parse(localStorage.getItem('items'));
    }
    for (let i in this.items) {
      if (this.items[i].product_id === item.product_id) {
        if (this.items[i].quantity > 0) {
        this.items[i].quantity--;
        if (this.items[i].quantity ===  0){
          // this.items.splice(i.to, 1);
        }
        localStorage.setItem('items', JSON.stringify(this.items));
      }
      break;
      }
    }
  }
}
