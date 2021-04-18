import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: HttpClient) { }
  create(value: any) {
    const url = this.apiUrl + '/login';
    return this.http.post(url, value);
  }
  adminLogin(value: any) {
    const url = this.apiUrl + '/admin/login';
    return this.http.post(url, value);
  }


}
