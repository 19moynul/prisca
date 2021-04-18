import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: HttpClient) { }
  getAllOrder() {
    const url = this.apiUrl + '/order/list';
    return this.http.get(url);
  }

  getOrder(id:any){
    const url = this.apiUrl + `/order/${id}`;
    return this.http.get(url);
  }

  changeStatus(data){
    const url = this.apiUrl + '/order/change-status';
    return this.http.post(url, data);
  }
}
