import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontendService } from '../../_service/frontend.service';

@Component({
  selector: 'ngx-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {

  url:any;
  data:any;
  constructor(private route: ActivatedRoute, private router: Router, private _frontendService:FrontendService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.url = params.url;
    })
    this.getData();
  }

  getData() {
    this._frontendService.getOthers(this.url).subscribe(
      (res: any) => {
        this.data = res.data
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

}
