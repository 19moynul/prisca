import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../../global';
import { FrontendService } from '../../_service/frontend.service';

@Component({
  selector: 'ngx-brand-story',
  templateUrl: './brand-story.component.html',
  styleUrls: ['./brand-story.component.scss']
})
export class BrandStoryComponent implements OnInit {
  light_theme:boolean=true;
  banner: any;
  imagePath = GlobalVariable.IMAGE_PATH;
  speech:any[];
  banners:any[];
  constructor(private _frontendService: FrontendService) { }

  ngOnInit(): void {
    var theme = sessionStorage.getItem('theme')
    if (theme == 'light') {
      this.light_theme = true;
    } else if (theme == 'dark') {
      this.light_theme = false;
    }
    this.getBanner();
    this.getAboutUsSpeech();
    this.getAboutUsBanner();
  }

  getBanner() {
    this._frontendService.getBanner(1).subscribe(
      (res: any) => {
        this.banner = res.data
      },
      (error: any) => {
        console.log(error);
      }
    )
  }
  getAboutUsSpeech() {
    this._frontendService.getAboutUsSpeech().subscribe(
      (res: any) => {
        this.speech = res.data;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }
  getAboutUsBanner() {
    this._frontendService.getAboutUsBanner().subscribe(
      (res: any) => {
        this.banners = res.data;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }


}
