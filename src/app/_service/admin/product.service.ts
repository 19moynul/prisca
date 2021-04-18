import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GlobalVariable } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: HttpClient) { }
  create(value: any) {
    const url = this.apiUrl + '/product/store';
    return this.http.post(url, value);
  }
  getEditData(id) {
    const url = this.apiUrl + `/product/edit/${id}`;
    return this.http.get(url);
  }

  getData(params: any) {
    const url = this.apiUrl + `/product/list?sort=${params.sort}&limit=${params.limit}&page=${params.page}& offer_price=${params.offer_price}&price=${params.price}&product_name=${params.product_name}&regular_price=${
    params.regular_price}&subscriber_price=${params.subscriber_price}`;
    return this.http.get(url);
  }

  deleteImage(id:any){
    const url = this.apiUrl + `/product/image/delete/${id}`;
    return this.http.get(url);
  }
}
