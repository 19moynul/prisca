import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: HttpClient) { }
  getAdmin(params: any) {
    const url = this.apiUrl + `/user/list?sort=${params.sort}&limit=${params.limit}&page=${params.page}& first_name=${params.first_name}&last_name=${ params.last_name}&email=${
    params.email}&role=1&status=${
    params.status}`;
    return this.http.get(url);
  }
  getUser(params: any) {
    const url = this.apiUrl + `/user/list?sort=${params.sort}&limit=${params.limit}&page=${params.page}& first_name=${params.first_name}&last_name=${ params.last_name}&email=${
    params.email}&role=2&status=${
    params.status}`;
    return this.http.get(url);
  }
  create(value: any) {
    const url = this.apiUrl + '/user/store';
    return this.http.post(url, value);
  }
  changeStatus(value:any){
    const url = this.apiUrl + `/user/change-status?status=${value.status}&id=${value.id}`;
    return this.http.post(url, value);
  }
  getEditData(id) {
    const url = this.apiUrl + `/user/edit/${id}`;
    return this.http.get(url);
  }

  changePassword(value){
    const url = this.apiUrl + '/user/change-password';
    return this.http.post(url, value);
  }
}
