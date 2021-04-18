import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  apiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: HttpClient) { }
  create(value: any) {
    const url = this.apiUrl + '/social-link/store';
    return this.http.post(url, value);
  }
  getEditData(id) {
    const url = this.apiUrl + `/social-link/edit/${id}`;
    return this.http.get(url);
  }
  getData(params: any) {
    const url = this.apiUrl + `/social-link/list?sort=${params.sort}&limit=${params.limit}&page=${params.page}`;
    return this.http.get(url);
  }
}
