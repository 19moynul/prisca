import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../../global';
import { AboutusService } from '../../../_service/admin/aboutus.service';

@Component({
  selector: 'ngx-about-info-list',
  templateUrl: './about-info-list.component.html',
  styleUrls: ['./about-info-list.component.scss']
})
export class AboutInfoListComponent implements OnInit {

  searchForm: FormGroup;
  all_data: any[];
  data: any[];
  pagination: any[] = [5, 10, 15, 20, 25, 30, "See All"];
  deleteID: any;
  editID: any;
  page: any = 1;
  limit: any = 10;
  totalLength: any;
  search_on_process: boolean = false;
  option: any[];
  image: any;
  imagePath = GlobalVariable.IMAGE_PATH;
  constructor(private _aboutusService:AboutusService,private router:Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    var params = {
      limit: this.limit,
      page: this.page,
      sort: 'DESC'
    };
    this._aboutusService.getSpeechData(params).subscribe((res: any) => {
      this.data = res.data.data;
      this.all_data = res.all_data;
      this.totalLength = res.data.total;
      this.page = res.data.current_page;
      this.search_on_process = false
    });
  }

  edit(id: any) {
    this.router.navigate(['/admin/aboutus/info/edit',id]); //emit value in product-manage component
  }
}
