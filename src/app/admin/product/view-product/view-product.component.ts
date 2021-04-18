import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalVariable } from '../../../global';
import { ProductService } from '../../../_service/admin/product.service';

@Component({
  selector: 'ngx-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  data:any;
  id:any;
  imagePath:any=GlobalVariable.IMAGE_PATH;
  constructor(private _productService:ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
    })
    if (this.id) {
      this.getEditData();
    }
  }

  getEditData() {
    this._productService.getEditData(this.id).subscribe((res: any) => {
      this.data = res.data;
    })
  }

}
