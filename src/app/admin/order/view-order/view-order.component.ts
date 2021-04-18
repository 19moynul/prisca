import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalVariable } from '../../../global';
import { OrderService } from '../../../_service/admin/order.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'ngx-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  data:any;
  items:any[];
  id:number;
  imagePath = GlobalVariable.IMAGE_PATH;
  totalQty:number = 0;
  totalPrice:number= 0;
  selected:number=2;
  constructor(private _ordeservice:OrderService,private route:ActivatedRoute,private _gs:GlobalService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = params.id
    })
    this.getData();
  }

  getData() {
    this._ordeservice.getOrder(this.id).subscribe(
      (res: any) => {
        this.data = res.data;
        this.items = res.items
        this.calculate();
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  calculate(){
    for(let item of this.items){
      this.totalQty += item.quantity
      this.totalPrice += item.quantity*item.price
    }
  }

  changeStatus(value){
    const data = {
      status:value,
      id:this.id
    }
    this._ordeservice.changeStatus(data).subscribe(
      (res:any)=>{
        this._gs.message('bottom-right', 'success', res.message);
        this.getData();
      },
      (error:any)=>{
        this._gs.message('bottom-right', 'danger', error.message);
      },
    )
  }

}
