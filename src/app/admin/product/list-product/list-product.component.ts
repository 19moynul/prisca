import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../../global';
import { ProductService } from '../../../_service/admin/product.service';

@Component({
  selector: 'ngx-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  searchForm: FormGroup;
  all_data: any[];
  pagination: any[] = [5, 10, 15, 20, 25, 30, "See All"];
  data: any[];
  deleteID: any;
  editID: any;
  page: any = 1;
  limit: any = 10;
  totalLength: any;
  search_on_process: boolean = false;
  option: any[];
  main_image: any;
  imagePath = GlobalVariable.IMAGE_PATH;
  //search arrays
  all_offer_price: any[] = [];
  all_price: any[] = [];
  all_product_name: any[] = [];
  all_regular_price: any[] = [];
  all_subscriber_price: any[] = [];
  constructor(private fb: FormBuilder, private _productService: ProductService, private router:Router){}
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      sort: ['DESC'],
      offer_price: [''],
      price: [''],
      product_name: [''],
      regular_price: [''],
      subscriber_price: ['']
    });
    this.getData();
    setTimeout(() => {
      this.Option('', '');
    }, 10)
  }

  getData() {
    var param_value = this.searchForm.value;
    var params = {
      limit: this.limit,
      page: this.page,
      offer_price: param_value.offer_price,
      price: param_value.price,
      product_name: param_value.product_name,
      regular_price: param_value.regular_price,
      subscriber_price: param_value.subscriber_price,
      sort: param_value.sort
    };
    this._productService.getData(params).subscribe((res: any) => {
      this.data = res.data.data;
      this.all_data = res.all_data;
      this.totalLength = res.data.total;
      this.page = res.data.current_page;
      this.search_on_process = false
    });
    setTimeout(() => {
      this.Option('', '');
    }, 10)
  }


  edit(id:any){
    this.router.navigate(['/admin/product/edit',id])
  }
  viewMore(id:any){
    this.router.navigate(['/admin/product/view',id])
  }

  cancel() {
    this.editID = 0;
  }

  search(event: any) {
    var field_name = event.target.name;
    const searchword = event.target.value;
    this.Option(searchword, field_name);
  }

  triggerSearch() {
    this.getData();
  }

  refresh() {
    this.search_on_process = true
    this.getData();
  }




//search data process section
Option(searchword: any,field_name:any) {
this.option = this.data.filter((res) => {
    if (field_name == 'offer_price' || field_name == '') {
      this.all_offer_price.length = 0;
      return (res.offer_price.toString().toLowerCase().match(searchword))
    }
    if (field_name == 'price' || field_name == '') {
      this.all_price.length = 0;
      return (res.price.match(searchword))
    }
    if (field_name == 'product_name' || field_name == '') {
      this.all_product_name.length = 0;
      return (res.product_name.toLowerCase().match(searchword.toLowerCase()))
    }
    if (field_name == 'regular_price' || field_name == '') {
      this.all_regular_price.length = 0;
      return (res.regular_price.match(searchword))
    }
    if (field_name == 'subscriber_price' || field_name == '') {
      this.all_subscriber_price.length = 0;
      return (res.subscriber_price.toLowerCase().match(searchword.toLowerCase()))
    }
  });
this.uniqueValue(field_name);
}

uniqueValue(field_name: any) {
  const option = this.option;
  let length = option.length;
  for (let i = 0; i < length; i++) {
    if (!this.all_offer_price.some(el => el.text === option[i].offer_price) && (field_name == 'offer_price' || field_name == '')) {
      var element = { text: option[i].offer_price, value: option[i].offer_price };
      this.all_offer_price.push(element);
    }
    if (!this.all_price.some(el => el.text === option[i].price) && (field_name == 'price' || field_name == '')) {
      var element = { text: option[i].price, value: option[i].price };
      this.all_price.push(element);
    }
    if (!this.all_product_name.some(el => el.text === option[i].product_name) && (field_name == 'product_name' || field_name == '')) {
      var element = { text: option[i].product_name, value: option[i].product_name };
      this.all_product_name.push(element);
    }
    if (!this.all_regular_price.some(el => el.text === option[i].regular_price) && (field_name == 'regular_price' || field_name == '')) {
      var element = { text: option[i].regular_price, value: option[i].regular_price };
      this.all_regular_price.push(element);
    }
    if (!this.all_subscriber_price.some(el => el.text === option[i].subscriber_price) && (field_name == 'subscriber_price' || field_name == '')) {
      var element = { text: option[i].subscriber_price, value: option[i].subscriber_price };
      this.all_subscriber_price.push(element);
    }
  }
}

}
