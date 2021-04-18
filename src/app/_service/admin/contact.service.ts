import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: HttpClient) { }
  create(value: any) {
    const url = this.apiUrl + '/contact/store';
    return this.http.post(url, value);
  }
  getEditData(id) {
    const url = this.apiUrl + `/contact/edit/${id}`;
    return this.http.get(url);
  }

  getData(params: any) {
    const url = this.apiUrl + `/contact/list?sort=${params.sort}&limit=${params.limit}&page=${params.page}`;
    return this.http.get(url);
  }

}
