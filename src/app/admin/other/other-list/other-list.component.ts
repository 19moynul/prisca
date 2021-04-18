import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../../global';
import { OtherService } from '../../../_service/admin/other.service';

@Component({
  selector: 'ngx-other-list',
  templateUrl: './other-list.component.html',
  styleUrls: ['./other-list.component.scss']
})
export class OtherListComponent implements OnInit {
  searchForm: FormGroup;
  data: any[];
  deleteID: any;
  editID: any;
  page: any = 1;
  limit: any = 10;
  totalLength: any;
  search_on_process: boolean = false;
  option: any[];
  imagePath = GlobalVariable.IMAGE_PATH;
  constructor(private _otherservice:OtherService, private router : Router) { }

  ngOnInit(): void {
    this.getData();
  }


  getData() {
    var params = {
      limit: this.limit,
      page: this.page,
      sort: 'DESC'
    };
    this._otherservice.getData(params).subscribe((res: any) => {
      this.data = res.data.data;
      this.totalLength = res.data.total;
      this.page = res.data.current_page;
      this.search_on_process = false
    });
  }

  edit(id:any){
    this.router.navigate(['/admin/others/edit',id]);
  }
  viewMore(id:any){
    this.router.navigate(['/admin/others/view',id]);
  }



}
