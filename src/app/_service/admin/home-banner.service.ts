import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../global';
@Injectable({
  providedIn: 'root'
})
export class HomeBannerService {

  apiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: HttpClient) { }
  create(value: any) {
    const url = this.apiUrl + '/home-banner/store';
    return this.http.post(url, value);
  }

  getData(params: any) {
    const url = this.apiUrl + `/home-banner/list?sort=${params.sort}&limit=${params.limit}&page=${params.page}`;
    return this.http.get(url);
  }
}
