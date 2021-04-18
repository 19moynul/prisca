import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class AboutusService {

  apiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: HttpClient) { }
  getData(params: any) {
    const url = this.apiUrl + `/aboutus-banner/list?sort=${params.sort}&limit=${params.limit}&page=${params.page}& `;
    return this.http.get(url);
  }

  create(value: any) {
    const url = this.apiUrl + '/aboutus-banner/store';
    return this.http.post(url, value);
  }
  getEditData(id) {
    const url = this.apiUrl + `/aboutus-banner/edit/${id}`;
    return this.http.get(url);
  }

  updateSpeech(value: any) {
    const url = this.apiUrl + '/aboutus-info/store';
    return this.http.post(url, value);
  }
  getEditSpeechData(id) {
    const url = this.apiUrl + `/aboutus-info/edit/${id}`;
    return this.http.get(url);
  }
  getSpeechData(params: any) {
    const url = this.apiUrl + `/aboutus-info/list?sort=${params.sort}&limit=${params.limit}&page=${params.page}& `;
    return this.http.get(url);
  }
}
