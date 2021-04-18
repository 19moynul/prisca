import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class NewsLetterService {

  apiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: HttpClient) { }
  create(value: any) {
    const url = this.apiUrl + '/news-letter/store';
    return this.http.post(url, value);
  }
  getEditData(id) {
    const url = this.apiUrl + `/news-letter/edit/${id}`;
    return this.http.get(url);
  }
}
