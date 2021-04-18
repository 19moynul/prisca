import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../../global';
import { SocialService } from '../../../_service/admin/social.service';

@Component({
  selector: 'ngx-social-list',
  templateUrl: './social-list.component.html',
  styleUrls: ['./social-list.component.scss']
})
export class SocialListComponent implements OnInit {

  searchForm: FormGroup;
  all_data: any[];
  data: any[];
  editID: any;
  page: any = 1;
  limit: any = 10;
  totalLength: any;
  search_on_process: boolean = false;
  option: any[];
  imagePath = GlobalVariable.IMAGE_PATH;
  constructor(private _socialService:SocialService, private router:Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    var params = {
      limit: this.limit,
      page: this.page,
      sort: 'DESC'
    };
    this._socialService.getData(params).subscribe((res: any) => {
      this.data = res.data.data;
      this.all_data = res.all_data;
      this.totalLength = res.data.total;
      this.page = res.data.current_page;
      this.search_on_process = false
    });
  }

  edit(id:any){
    this.router.navigate(['/admin/social/edit',id])
  }

}
