import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {

  apiUrl = GlobalVariable.FRONTEND_API_URL;
  constructor(private http: HttpClient) { }
  getHomeBanner() {
    const url = this.apiUrl + `/home-banner`;
    return this.http.get(url);
  }
  getLatestProduct() {
    const url = this.apiUrl + `/latest-product?limit=5`;
    return this.http.get(url);
  }
  getFeaturedProduct() {
    const url = this.apiUrl + `/latest-product?limit=5`;
    return this.http.get(url);
  }
  getSocial() {
    const url = this.apiUrl + `/social`;
    return this.http.get(url);
  }
  getFooterCard() {
    const url = this.apiUrl + `/footer-card`;
    return this.http.get(url);
  }
  getContactInfo() {
    const url = this.apiUrl + `/contact-info`;
    return this.http.get(url);
  }
  getBanner(id:number) {
    const url = this.apiUrl + `/banner/${id}`;
    return this.http.get(url);
  }
  getAboutUsSpeech() {
    const url = this.apiUrl + `/aboutus-speech`;
    return this.http.get(url);
  }
  getAboutUsBanner() {
    const url = this.apiUrl + `/aboutus-banner`;
    return this.http.get(url);
  }
  getProduct() {
    const url = this.apiUrl + `/product`;
    return this.http.get(url);
  }
  getContact(){
    const url = this.apiUrl + `/contact`;
    return this.http.get(url);
  }
  getNewsLetter(){
    const url = this.apiUrl + `/news-letter`;
    return this.http.get(url);
  }
  contact(value:any){
    const url = this.apiUrl + '/contact/message';
    return this.http.post(url, value);
  }

  getProductDetails(product_name: any) {
    var price_type = sessionStorage.getItem('price_type');
    const url = this.apiUrl + `/product/${product_name}?price_type=${price_type}`;
    return this.http.get(url);
  }

  getOthers(value:any) {
    const url = this.apiUrl + `/other/${value}`;
    return this.http.get(url);
  }

  storeEmail(value: any) {
    // console.log(value);
    const url = this.apiUrl + '/news-letter/store';
    return this.http.post(url, value);
  }
  processOrder(value:any){
    const url = this.apiUrl + '/order/process';
    return this.http.post(url, value);
  }

}
