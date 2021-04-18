import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: HttpClient) { }
  adminLogin(value: any) {
    const url = this.apiUrl + '/admin/login';
    return this.http.post(url, value);
  }
  loggedIn(){
    if (localStorage.getItem('admin-token') && localStorage.getItem('admin-data')){
      return true;
    }else{
      return false;
    }
  }
}
