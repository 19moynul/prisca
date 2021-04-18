import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  apiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: HttpClient) { }
  create(value: any) {
    const url = this.apiUrl + '/banner/store';
    return this.http.post(url, value);
  }
  getData(params: any) {
    const url = this.apiUrl + `/banner/list?sort=${params.sort}&limit=${params.limit}&page=${params.page}`;
    return this.http.get(url);
  }

  getEditData(id){
    const url = this.apiUrl + `/banner/edit/${id}`;
    return this.http.get(url);
  }
}
