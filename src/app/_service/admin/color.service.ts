import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: HttpClient) { }
  create(value: any) {
    const url = this.apiUrl + '/color/store';
    return this.http.post(url, value);
  }
  getData(params: any) {
    const url = this.apiUrl + `/color/list?sort=${params.sort}&limit=${params.limit}&page=${params.page}& `;
    return this.http.get(url);
  }
}
