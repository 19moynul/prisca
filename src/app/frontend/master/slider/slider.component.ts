import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../../../global';
import { FrontendService } from '../../../_service/frontend.service';

@Component({
  selector: 'ngx-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  data:any[];
  imagePath = GlobalVariable.IMAGE_PATH;
  constructor(private _frontendService:FrontendService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this._frontendService.getHomeBanner().subscribe(
      (res:any)=>{
        this.data=res.data
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }

}
