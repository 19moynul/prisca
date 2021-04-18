import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  apiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: HttpClient) { }
  getData(params: any) {
    const url = this.apiUrl + `/other/list?sort=${params.sort}&limit=${params.limit}&page=${params.page}& `;
    return this.http.get(url);
  }
  create(value: any) {
    const url = this.apiUrl + '/other/store';
    return this.http.post(url, value);
  }
  getEditData(id) {
    const url = this.apiUrl + `/other/edit/${id}`;
    return this.http.get(url);
  }
}
