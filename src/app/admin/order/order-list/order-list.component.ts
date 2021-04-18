import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../_service/admin/order.service';

@Component({
  selector: 'ngx-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  data:any;
  constructor(private _ordeservice:OrderService,private router:Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._ordeservice.getAllOrder().subscribe(
      (res: any) => {
        this.data = res.data
        console.log(res);
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  viewMore(value:any){
    this.router.navigate(['/admin/order/',value])
  }

}
