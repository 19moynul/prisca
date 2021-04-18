import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../../../global';
import { FrontendService } from '../../../_service/frontend.service';

@Component({
  selector: 'ngx-footer-part',
  templateUrl: './footer-part.component.html',
  styleUrls: ['./footer-part.component.scss']
})
export class FooterPartComponent implements OnInit {
  light_theme: boolean = true;
  socials: any[];
  footerCards: any[];
  contacts: any[];
  imagePath = GlobalVariable.IMAGE_PATH;
  constructor(private _frontendService: FrontendService) { }

  ngOnInit(): void {
    var theme = sessionStorage.getItem('theme')
    if (theme == 'light') {
      this.light_theme = true;
    } else if (theme == 'dark') {
      this.light_theme = false;
    }
    this.getSocial();
    this.getFooterCard();
    this.getContactInfo();
  }

  getSocial() {
    this._frontendService.getSocial().subscribe(
      (res: any) => {
        this.socials = res.data
      },
      (error: any) => {
        console.log(error);
      }
    )
  }
  getFooterCard() {
    this._frontendService.getFooterCard().subscribe(
      (res: any) => {
        this.footerCards = res.data
      },
      (error: any) => {
        console.log(error);
      }
    )
  }
  getContactInfo() {
    this._frontendService.getContactInfo().subscribe(
      (res: any) => {
        this.contacts = res.data
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

}
