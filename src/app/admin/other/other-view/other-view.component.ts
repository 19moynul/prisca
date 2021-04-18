import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OtherService } from '../../../_service/admin/other.service';

@Component({
  selector: 'ngx-other-view',
  templateUrl: './other-view.component.html',
  styleUrls: ['./other-view.component.scss']
})
export class OtherViewComponent implements OnInit {

  id:number;
  data:any;
  constructor(private _otherService:OtherService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
    })
    this.getData();
  }

  getData() {
    this._otherService.getEditData(this.id).subscribe((res: any) => {
      this.data = res.data;
    })
  }

}
